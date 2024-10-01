package com.binh.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TypeDTO {
	private Integer id;
	
	private String typeName;
	
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
