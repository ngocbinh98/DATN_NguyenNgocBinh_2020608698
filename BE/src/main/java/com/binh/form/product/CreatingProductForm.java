package com.binh.form.product;

import org.hibernate.validator.constraints.Length;

import com.binh.entity.Product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingProductForm {
	
	@NotBlank(message = "The product name mustn't be null value")
	@Length(max = 100, message = "The username's length is max 50 characters")
	@Length(min = 2, message = "The username's length is min 6 characters")
	private String name;
	
//	@NotBlank(message = "The collection mustn't be null value")
	private String collection;
	
	@NotNull(message = "The size mustn't be null value")
	private String size;
	
	@NotBlank(message = "The material mustn't be null value")
	private String material;
	
	@NotBlank(message = "The description mustn't be null value")
	private String description;
	
	@NotNull(message = "The price mustn't be null value")
	private Integer price;
	
//	@NotBlank(message = "The image mustn't be null value")
	private String image;
	
	private String type;
	
	private String category;
	
	public Product toEntity() {
		return new Product(name, collection, size, material, description, price, image);
	}
}
