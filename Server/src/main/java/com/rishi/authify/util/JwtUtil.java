package com.rishi.authify.util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	/*
	 * The secret key value fetched from the application.properties
	 */
	@Value("${jwt.secret.key}")
	private String secretKey;
	
	
	/*
	 * 12 hours token validity
	 */
	private static final Long EXPIRATION_TIME = (long) (12 * 60 * 60 * 100);
	
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("roles", userDetails.getAuthorities()
		.stream().map(GrantedAuthority::getAuthority).toList());
		return createToken(claims, userDetails.getUsername());
	}

	/*
	 * Helper method to generate Token
	 */
	private String createToken(Map<String, Object> claims, String username) {
		
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		return Jwts.builder()
		.addClaims(claims)
		.setSubject(username)
		.setIssuedAt(new Date(System.currentTimeMillis()))
		.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
		.signWith(key, SignatureAlgorithm.HS512)
		.compact();
	}
	
	/*
	 * This extracts the claims from the token
	 */
	public Claims extractClaims(String token) {
		
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	/*
	 * This extracts the email from the token
	 */
	public String extractEmail(String token) {
		return extractClaims(token).getSubject();
	}
	
	/*
	 * This extracts the token expiration time
	 */
	public Date extractExpiration(String token) {
		return extractClaims(token).getExpiration();
	}
	
	/*
	 * This checks if the token is expired or not
	 */
	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	/*
	 * This is to extract the role from the token
	 */
	public Object extractRole(String token) {
		return extractClaims(token).get("roles");
	}
	
	/*
	 * This checks if the token is valid or not
	 */
	public Boolean isValidToken(String token, String email) {
		final String extractedEmail = extractEmail(token);
		return email.equals(extractedEmail) && !isTokenExpired(token);
		
	}

}