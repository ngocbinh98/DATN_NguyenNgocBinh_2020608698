package com.binh.validation.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.binh.service.IProductService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class ProductIDExistsValidator implements ConstraintValidator<ProductIDExists, Integer>{
	
	@Autowired
	private IProductService productService;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(id)) {
			return true;
		}
		
		return productService.isProductExistsByID(id);
	}

}
