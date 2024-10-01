package com.binh.dto;

import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentDTO {
	private Integer id;

	private Date paymentDate;

	private ShopOrderDTO shopOrder;
	
	@Data
	@NoArgsConstructor
	public static class ShopOrderDTO {
		private Integer totalPrice;
	}
}
