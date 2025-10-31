package com.rishi.authify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.rishi.authify.io.ApiResponse;


@ControllerAdvice
public class GlobalExceptionHandler {
	
	/*
	 * This is to handle the UserAlreadyExistsException
	 */
	@ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> userAlreadyExists(UserAlreadyExistsException e) {
    	
        ApiResponse response = new ApiResponse(false, e.getMessage(), null);
        
        return ResponseEntity.status(HttpStatus.CONFLICT)
        		.body(response);
    }
	
	/*
	 * This is to handle the BadCrentialsException
	 */
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiResponse> badCredentials(BadCredentialsException e) {
		
		ApiResponse response = new ApiResponse(false, "Invalid Email or Password", null);
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(response);
	}
	
	/*
	 * This is to handle the Validation Errors 
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse> handleValidationExceptions(
	        MethodArgumentNotValidException ex) {

	    // Get only the first error message
	    String errorMessage = ex.getBindingResult()
	            .getFieldErrors()
	            .stream()
	            .findFirst()
	            .map(error -> error.getDefaultMessage())
	            .orElse("Validation error occurred");

	    ApiResponse response = new ApiResponse(false, errorMessage, null);

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(response);
	}
	
	/*
	 * All other Exceptions are handled by this 
	 */
	@ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleAll(Exception e) {
    	
        ApiResponse response = new ApiResponse(false, e.getMessage(), null);
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        		.body(response);
    }
}
