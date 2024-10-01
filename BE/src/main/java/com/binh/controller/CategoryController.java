package com.binh.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.binh.dto.CategoryDTO;
import com.binh.entity.Category;
import com.binh.form.category.CreatingCategoryForm;
import com.binh.form.category.UpdatingCategoryForm;
import com.binh.service.ICategoryService;
import com.binh.validation.category.CategoryIDExists;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/categories")
public class CategoryController {

	@Autowired
	private ICategoryService service;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping()
	public ResponseEntity<?> getAllCategory(@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) Pageable pageable) {
		
		Page<Category> entityPages = service.getAllCategorys(pageable);

		List<CategoryDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<CategoryDTO>>() {
		}.getType());

		Page<CategoryDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> createCategory(@RequestBody CreatingCategoryForm form){
		service.createCategory(form);
		return new ResponseEntity<>("Create successfully!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable(value = "id") @CategoryIDExists Integer id,
											@RequestBody UpdatingCategoryForm form){
		service.updateCategory(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteCategory(@PathVariable(value = "ids") List<Integer> ids){
		service.deleteCategory(ids);
		return new ResponseEntity<>("Delete successfully!", HttpStatus.OK);
	}
}
