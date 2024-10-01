package com.binh.dto;

import java.util.Date;
import java.util.List;

import com.binh.entity.Role;
import com.binh.entity.User;
import com.binh.entity.UserStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
	
	private Integer userId;
	
	private String username;
	
	private String email;
	
	private String password;
	
	private String address;
	
	private String phone;
	
	private String firstName;
	
	private String lastName;
	
	private Role role;
	
	private String image;
	
	private UserStatus userStatus;
	
	private List<ShoppingCartDTO> shoppingCarts;
	
	private List<ShopOrderDTO>	shopOrders;
	
	private List<PaymentDTO> payments;
	
	@Data
	@NoArgsConstructor
	public static class ShoppingCartDTO{
		
		private Integer id;
	}
	
	@Data
	@NoArgsConstructor
	public static class PaymentDTO{
		
		private Integer id;
		
		private Date datePayment;
	}
	
	@Data
	@NoArgsConstructor
	public static class ShopOrderDTO{
		private Integer id;
		
		private Date orderDate;
		
		private Integer totalPrice;
	}
	
	public User toEntity() {
		return new User(username, email, password, address, phone, firstName, lastName);
	}
}
