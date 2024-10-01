package com.binh.form.category;

import com.binh.entity.Category;
import com.binh.validation.category.CategoryIDExists;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingCategoryForm {
	@NotBlank(message = "The Category Name mustn't be null value")
	@CategoryIDExists
	private String categoryName;
	
	public Category toEntity() {
		return new Category(categoryName);
	}
}
