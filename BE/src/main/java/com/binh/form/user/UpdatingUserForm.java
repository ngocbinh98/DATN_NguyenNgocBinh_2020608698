package com.binh.form.user;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingUserForm {

	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	protected String address;
	
	protected String phone;

	protected String firstName;

	protected String lastName;
}
