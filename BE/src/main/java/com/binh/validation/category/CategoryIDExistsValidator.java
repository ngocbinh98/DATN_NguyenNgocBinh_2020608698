package com.binh.validation.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.binh.service.ICategoryService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class CategoryIDExistsValidator implements ConstraintValidator<CategoryIDExists, Integer>{
	
	@Autowired
	private ICategoryService categoryService;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(id)) {
			return true;
		}
		
		return categoryService.isCategoryExistsByID(id);
	}

}
