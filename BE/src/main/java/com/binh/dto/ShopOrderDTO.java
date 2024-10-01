package com.binh.dto;

import java.util.Date;
import java.util.List;

import com.binh.entity.ShopOrderStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShopOrderDTO {
	private Integer id;

	private Date orderDate;

	private Integer totalPrice;

	private ShopOrderStatus orderStatus;
	
	private String addressShipping;

	private UserDTO user;

	private PaymentDTO payment;

	private List<ShopOrderItemDTO> shopOrderItems;

	@Data
	@NoArgsConstructor
	public static class PaymentDTO {
		private Integer id;

		private Date paymentDate;
	}

	@Data
	@NoArgsConstructor
	public static class ShopOrderItemDTO {
		private ProductDTO product;

		private Integer quantity;
	}

	@Data
	@NoArgsConstructor
	public static class ProductDTO {
		private Integer id;

		private String name;
		
		private Integer price;
	}

	@Data
	@NoArgsConstructor
	public static class UserDTO {
		private String username;

		private String fullName;
	}
}
