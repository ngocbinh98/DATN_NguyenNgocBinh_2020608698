package com.binh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDTO {
	private Integer id;
	
	private String name;

	private String collection;

	private String size;

	private String material;

	private String description;

	private Integer price;

	private String image;

	private TypeDTO type;

	private CategoryDTO category;
	
	@Data
	@NoArgsConstructor
	public static class TypeDTO {
		private String typeName;
	}
	
	@Data
	@NoArgsConstructor
	public static class CategoryDTO{
		private String categoryName;
	}
}
