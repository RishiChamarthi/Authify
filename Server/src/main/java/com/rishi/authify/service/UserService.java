package com.rishi.authify.service;

import com.rishi.authify.exception.UserAlreadyExistsException;
import com.rishi.authify.io.UserRequest;
import com.rishi.authify.io.UserResponse;

public interface UserService {

	UserResponse createUser(UserRequest userRequest) throws UserAlreadyExistsException;

	UserResponse getUser(String email);
	
	String sendResetOtp(String email);
	
	void resetPassword(String email, String password);

	String sendVerifyOtp(String email);

	void verifyUser(String email, String otp);

	void verifyResetOtp(String email, String otp);
	
}
