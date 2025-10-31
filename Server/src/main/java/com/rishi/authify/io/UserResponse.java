package com.rishi.authify.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

	private String userId;
	
	private String name;
	
	private String email;
	
	private String role;
	
	private Boolean isAccountVerified;
	
}
