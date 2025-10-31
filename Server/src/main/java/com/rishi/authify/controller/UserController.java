package com.rishi.authify.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.authify.exception.UserAlreadyExistsException;
import com.rishi.authify.io.ApiResponse;
import com.rishi.authify.io.EmailRequest;
import com.rishi.authify.io.OtpRequest;
import com.rishi.authify.io.ResetPasswordRequest;
import com.rishi.authify.io.UserRequest;
import com.rishi.authify.io.UserResponse;
import com.rishi.authify.io.VerfiyUserRequest;
import com.rishi.authify.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	/*
	 * Registration handler
	 */
	@PostMapping("/register")
	public ResponseEntity<ApiResponse> createUser(@Valid @RequestBody UserRequest userRequest)
			throws UserAlreadyExistsException {

		UserResponse userResonse = userService.createUser(userRequest);
		
		/*
		 * We can also send a mail upon registration
		 */

		ApiResponse apiResponse = new ApiResponse(true, "Registration Successful", Map.of("user", userResonse));

		return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
	}

	/*
	 * This is to get the Logged In user data
	 */
	@GetMapping("/user")
	public ResponseEntity<ApiResponse> getUser(@CurrentSecurityContext(expression = "authentication?.name") String email) {

		UserResponse user = userService.getUser(email);
		
		Map<String, Object> map = new HashMap<>();
		map.put("user", user);

		ApiResponse apiResponse = new ApiResponse(true, "User Details Fetched Successfully", map);

		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}
	
	/*
	 * This sends the OTP to reset the password
	 */
	@PostMapping("/send-reset-otp")
	public ResponseEntity<ApiResponse> sendResetOtp(@Valid @RequestBody EmailRequest emailRequest) {
		String otp = userService.sendResetOtp(emailRequest.getEmail());
		
		ApiResponse apiResponse = new ApiResponse(true, "Use " + otp +" to reset your password", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(apiResponse);
	}
	
	/*
	 * This verifies the reset-password OTP
	 */
	@PostMapping("/verify-reset-otp")
	public ResponseEntity<ApiResponse> verifyResetOtp(@Valid @RequestBody OtpRequest otpRequest) {
		
		userService.verifyResetOtp(otpRequest.getEmail(), otpRequest.getOtp());
		
		ApiResponse apiResponse = new ApiResponse(true, "Otp verification Successful", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(apiResponse);
	}
	
	/*
	 * This is used to reset the password
	 */
	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
		
		userService.resetPassword(resetPasswordRequest.getEmail(), resetPasswordRequest.getPassword());
		
		ApiResponse apiResponse = new ApiResponse(true, "Password Reset Successfull", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(apiResponse);
	}
	
	/*
	 * This sends the user verification OTP
	 */
	@PostMapping("/send-verify-otp")
	public ResponseEntity<ApiResponse> sendVerifyOtp(@Valid @RequestBody EmailRequest emailRequest) {
		
		String otp = userService.sendVerifyOtp(emailRequest.getEmail());
		
		ApiResponse apiResponse = new ApiResponse(true, "Use " + otp +" to verify your account", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(apiResponse);
	}
	
	/*
	 * This verifies the user with OTP
	 */
	@PostMapping("/verify-user")
	public ResponseEntity<ApiResponse> verifyUser(@Valid @RequestBody VerfiyUserRequest verfiyUserRequest) {
		
		userService.verifyUser(verfiyUserRequest.getEmail(), verfiyUserRequest.getOtp());
		
		ApiResponse apiResponse = new ApiResponse(true, "Account verified Successfully", null);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(apiResponse);
	}

}
