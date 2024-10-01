package com.binh.validation.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.binh.service.ITypeService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class TypeIDExistsValidator implements ConstraintValidator<TypeIDExists, Integer>{
	
	@Autowired
	private ITypeService typeService;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(id)) {
			return true;
		}
		
		return typeService.isTypeExistsByID(id);
	}

}
