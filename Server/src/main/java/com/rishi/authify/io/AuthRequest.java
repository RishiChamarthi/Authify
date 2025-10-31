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
public class AuthRequest {

	@NotBlank(message = "Email should not be empty")
	@Email(message = "Invalid email")
	private String email;
	
	@NotBlank(message = "Password can not be empty")
	@Size(min = 8, message = "Password should contain atleast 8 characters")
	@Size(max = 20, message = "Password should contain maximum of 20 characters")
	private String password;
	
}
