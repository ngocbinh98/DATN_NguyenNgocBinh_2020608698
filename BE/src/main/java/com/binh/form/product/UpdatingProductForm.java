package com.binh.form.product;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingProductForm {
	private String name;
	
	private String collection;
	
	private String size;
	
	private String material;
	
	private String description;
	
	private Integer price;
	
	private String image;
	
	private String type;
	
	private String category;
}
