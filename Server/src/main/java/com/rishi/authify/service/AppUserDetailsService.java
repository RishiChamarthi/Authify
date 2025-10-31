package com.rishi.authify.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rishi.authify.entity.UserEntity;
import com.rishi.authify.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		UserEntity userEntity = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
		
		return User.
		withUsername(userEntity.getEmail())
		.password(userEntity.getPassword())
		.roles(userEntity.getRole())
		.build();	
	}
	
}
