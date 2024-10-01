package com.binh.form.user;

import org.hibernate.validator.constraints.Length;

import com.binh.entity.User;
import com.binh.validation.user.EmailNotExists;
import com.binh.validation.user.UsernameNotExists;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingUserForm {
	
	@NotBlank(message = "The username mustn't be null value")
	@Length(max = 50, message = "The username's length is max 50 characters")
	@Length(min = 6, message = "The username's length is min 6 characters")
	@UsernameNotExists
	private String username;
	
	@NotBlank(message = "The email mustn't be null value")
	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	@EmailNotExists
	private String email;
	
	@NotBlank(message = "The address mustn't be null value")
	@Length(max = 50, message = "The email's length is max 100 characters")
	private String address;
	
	@NotBlank(message = "The phone mustn't be null value")
	@Length(max = 25, message = "The phone's length is max 100 characters")
	private String phone;
	
	@NotBlank(message = "The password mustn't be null value")
	private String password;
	
	@NotBlank(message = "The first name mustn't be null value")
	private String firstName;
	
	@NotBlank(message = "The last name mustn't be null value")
	private String lastName;
	
	public User toEntity() {
		return new User(username, email, password, address, phone,  firstName, lastName);
	}
}
