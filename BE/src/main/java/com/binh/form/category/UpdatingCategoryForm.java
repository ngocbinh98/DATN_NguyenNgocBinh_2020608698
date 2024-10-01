package com.binh.form.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingCategoryForm {
	@NotBlank(message = "The Category Name mustn't be null value")
//	@CategoryNameNotExists
	private String categoryName;
}
