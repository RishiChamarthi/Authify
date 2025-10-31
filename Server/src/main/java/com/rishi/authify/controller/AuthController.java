package com.rishi.authify.controller;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.authify.io.ApiResponse;
import com.rishi.authify.io.AuthRequest;
import com.rishi.authify.service.AppUserDetailsService;
import com.rishi.authify.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authenticationManager;
	
	private final AppUserDetailsService appUserDetailsService;
	
	private final JwtUtil jwtUtil;

	/*
	 * Login handler
	 */
	@PostMapping("/login")
	public ResponseEntity<ApiResponse> login(@Valid @RequestBody AuthRequest authRequest) throws Exception {
		
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
				);
		
		UserDetails userDetails = appUserDetailsService.loadUserByUsername(authRequest.getEmail());
		
		String token = jwtUtil.generateToken(userDetails);
		
		ResponseCookie cookie = ResponseCookie.from("jwt", token)
				.httpOnly(true)
				.path("/")
				.maxAge(Duration.ofDays(1))
				.sameSite("Strict")
				.build();

		Map<String, Object> map = new HashMap<>();
		map.put("token", token);
		
		ApiResponse apiResponse = new ApiResponse(true, "Login successfull", map);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(apiResponse);
	}
	
	/*
	 * Logout handler
	 */
	@PostMapping("/logout")
	public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
		ResponseCookie cookie = ResponseCookie.from("jwt", "")
		.httpOnly(true)
		.secure(true)
		.path("/")
		.maxAge(0)
		.sameSite("Strict")
		.build();
		
		ApiResponse responseBody = new  ApiResponse(true, "Logout Successful", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(responseBody);
	}
	
}
