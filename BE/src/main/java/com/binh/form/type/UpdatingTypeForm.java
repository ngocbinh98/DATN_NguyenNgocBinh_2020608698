package com.binh.form.type;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingTypeForm {
	@NotBlank(message = "The Type Name mustn't be null value")
//	@TypeNameNotExists
	private String typeName;
}
