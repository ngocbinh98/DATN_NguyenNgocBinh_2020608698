package com.binh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProfileDTO {

	private String username;

	private String email;

	private String firstName;

	private String lastName;

	
	private String address;

	private String phone;
	
	private String role;

	private String status;

	public ProfileDTO(String userName, String email, String firstName, String lastName,String address, String phone, String role, String status) {
		this.username = userName;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.phone = phone;
		this.role = role;
		this.status = status;
	}
}
