package com.rishi.authify.service;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rishi.authify.entity.UserEntity;
import com.rishi.authify.exception.UserAlreadyExistsException;
import com.rishi.authify.io.UserRequest;
import com.rishi.authify.io.UserResponse;
import com.rishi.authify.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder;

	private UserEntity toUserEntity(UserRequest userRequest) {
		return UserEntity.builder()
				.userId(UUID.randomUUID().toString())
				.name(userRequest.getName())
				.email(userRequest.getEmail())
				.password(passwordEncoder.encode(userRequest.getPassword()))
				.role(userRequest.getRole() == null ? "USER" : userRequest.getRole())
				.isAccountVerified(false)
				.verifyOtp(null)
				.verifyOtpExpireAt(0L)
				.resetOtp(null)
				.resetOtpExpireAt(0L)
				.build();
	}
	
	private UserResponse toUserResponse(UserEntity userEntity) {
		return UserResponse.builder()
				.userId(userEntity.getUserId())
				.name(userEntity.getName())
				.email(userEntity.getEmail())
				.role(userEntity.getRole())
				.isAccountVerified(userEntity.getIsAccountVerified())
				.build();
	}

	@Override
	public UserResponse createUser(UserRequest userRequest) throws UserAlreadyExistsException {
		
		if(userRepository.existsByEmail(userRequest.getEmail())) {
			throw new UserAlreadyExistsException(userRequest.getEmail());
		}
		
		UserEntity userEntity = toUserEntity(userRequest);
		
		UserEntity createdUser = userRepository.save(userEntity);
		
		return toUserResponse(createdUser);
	}
	
	@Override
	public UserResponse getUser(String email) {
		UserEntity userEntity = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
		
		return toUserResponse(userEntity);
	}

	@Override
	public String sendResetOtp(String email) {
		UserEntity existingUser = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
		
		if(existingUser.getResetOtpExpireAt() > System.currentTimeMillis()) {
			return existingUser.getResetOtp();
		}
		
		/*
		 * Generating 6 digit OTP
		 */
		String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
		
		/*
		 * OTP expire after 15 minutes
		 */
		Long expiryTime = System.currentTimeMillis() + (15 * 60 * 1000);
		
		existingUser.setResetOtp(otp);
		existingUser.setResetOtpExpireAt(expiryTime);
		
		userRepository.save(existingUser);
		
		return otp;
	}

	@Override
	public void verifyResetOtp(String email, String otp) {
		
		UserEntity userEntity = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		if(userEntity.getResetOtp() == null || !userEntity.getResetOtp().equals(otp)) {
			throw new RuntimeException("Invalid OTP");
		}
		
		if(userEntity.getResetOtpExpireAt() < System.currentTimeMillis()) {
			/*
			 * If OTP expired update the userEntity with the OTP to null and expire time to 0L
			 */
			userEntity.setResetOtp(null);
			userEntity.setResetOtpExpireAt(0L);
			userRepository.save(userEntity);
			throw new RuntimeException("OTP expired");
		}
		
		/*
		 * verified the otp
		 */
		userEntity.setResetOtp(null);
		userEntity.setResetOtpExpireAt(0L);
		userRepository.save(userEntity);
		
	}
	
	@Override
	public String sendVerifyOtp(String email) {
		
		UserEntity existingUser = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		if(existingUser.getIsAccountVerified() != null && existingUser.getIsAccountVerified()) {
			throw new RuntimeException("Account already verified");
		}
		
		if(existingUser.getVerifyOtpExpireAt() > System.currentTimeMillis()) {
			return existingUser.getVerifyOtp();
		}
		
		/*
		 * Generating 6 digit OTP
		 */
		String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
		
		/*
		 * OTP expire after 15 minutes
		 */
		Long expiryTime = System.currentTimeMillis() + 15 * 60 * 1000;
		
		existingUser.setVerifyOtp(otp);
		existingUser.setVerifyOtpExpireAt(expiryTime);
		userRepository.save(existingUser);
		
		return otp;
		
	}

	@Override
	public void verifyUser(String email, String otp) {
		
		UserEntity existingUser = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		if(existingUser.getIsAccountVerified() != null && existingUser.getIsAccountVerified()) {
			throw new RuntimeException("Account already verified");
		}
		
		if(existingUser.getVerifyOtp() == null || !existingUser.getVerifyOtp().equals(otp)) {
			throw new RuntimeException("Invalid OTP");
		}
		if(existingUser.getVerifyOtpExpireAt() < System.currentTimeMillis()) {
			existingUser.setVerifyOtp(null);
			existingUser.setVerifyOtpExpireAt(0L);
			userRepository.save(existingUser);
			throw new RuntimeException("OTP expired");
		}
		
		existingUser.setIsAccountVerified(true);
		existingUser.setVerifyOtp(null);
		existingUser.setVerifyOtpExpireAt(0L);
		userRepository.save(existingUser);		
		
	}

	@Override
	public void resetPassword(String email, String password) {
		UserEntity userEntity = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		userEntity.setPassword(passwordEncoder.encode(password));
		
		userRepository.save(userEntity);
		
	}

}
