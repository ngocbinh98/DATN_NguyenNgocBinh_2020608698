package com.binh.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShoppingCartDTO{
	private Integer id;
	
	private UserDTO user;
	
	private List<ShoppingCartItemDTO> shoppingCartItems;
	
	@Data
	@NoArgsConstructor
	public static class UserDTO {
		private String username;
	}
	
	@Data
	@NoArgsConstructor
	public static class ShoppingCartItemDTO {
		private Integer quantity;
		
		private ProductDTO product;
	}
	@Data
	@NoArgsConstructor
	public static class ProductDTO {
		private Integer id;
		
		private String name;
		
		private String collection;
		
		private String material;
		
		private String size;
		
		private Integer price;
		
		private String image;
	}
}
