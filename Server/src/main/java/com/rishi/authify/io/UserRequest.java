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
public class UserRequest {

	@NotBlank(message = "Name should not be empty")
	@Size(min = 2, message = "Name should be atleast 2 characters")
	@Size(max = 20, message = "Name should contain maximum of 20 characters")
	private String name;
	
	@NotBlank(message = "Email should not be empty")
	@Email(message = "Invalid email")
	private String email;
	
	@NotBlank(message = "Password can not be empty")
	@Size(min = 8, message = "Password should contain atleast 8 characters")
	@Size(max = 20, message = "Password should contain maximum of 20 characters")
	private String password;
	
	private String role;
}
