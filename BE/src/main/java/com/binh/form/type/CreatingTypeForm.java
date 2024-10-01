package com.binh.form.type;

import com.binh.entity.Type;
import com.binh.validation.type.TypeIDExists;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingTypeForm {
	@NotBlank(message = "The Type Name mustn't be null value")
	@TypeIDExists
	private String typeName;
	
	public Type toEntity() {
		return new Type(typeName);
	}
}
