package com.binh.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDTO {
	private Integer id;
	
	private String categoryName;
	
	private List<ProductDTO> products;
	
	@Data
	@NoArgsConstructor
	public static class ProductDTO{
		private Integer id;
		
		private String name;
		
		private String price;
		
		private String image;
	}
}
