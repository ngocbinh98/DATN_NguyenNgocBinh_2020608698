package com.binh.form.shoporder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingShopOrderForm {
	
	@NotBlank(message = "Không được để trống")
	@Pattern(regexp = "NOT_PAY|PAY")
	private String orderStatus;

}
