package com.rishi.authify.io;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpRequest {

	@NotBlank(message = "Email should not be empty")
	@Email(message = "Invalid email")
	private String email;
	
	@NotBlank(message = "OTP should not be empty")
	@Size(min = 6, max = 6, message = "Enter a valid 6 digit OTP")
	private String otp;
}
