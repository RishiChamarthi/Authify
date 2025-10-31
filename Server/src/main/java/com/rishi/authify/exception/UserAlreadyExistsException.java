package com.rishi.authify.exception;

public class UserAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public UserAlreadyExistsException() {
		super("User Already exists with this email");
	}
	
	public UserAlreadyExistsException(String email) {
		super("User Already exists with email : " + email);
	}

}
