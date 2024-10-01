package com.binh.validation.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.binh.service.IUserService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailNotExistsValidator implements ConstraintValidator<EmailNotExists, String>{

	@Autowired
	private IUserService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {

		if (StringUtils.isEmpty(email)) {
			return true;
		}
		
		return !service.existsUserByEmail(email);
	}
	
	
}
