package com.binh.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class ComponentConfiguration {

	@Bean
	public ModelMapper initModelMapper() {
		return new ModelMapper();
	}

	@Bean
	public Cloudinary cloudinary() {
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "dlmjgnar7",
				"api_key"	, "176792767815428",
				"api_secret", "vWY5ujjYsjfNQUxhw3cBIzdHl_o"
				
		));
		return cloudinary;
	}
}
