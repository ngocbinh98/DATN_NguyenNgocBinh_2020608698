package com.binh.form.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingUserByAdminForm extends UpdatingUserForm{
	@NotBlank(message = "Không được để trống")
	@Pattern(regexp = "ADMIN|USER")
	private String role;
	
	private String password;
}
