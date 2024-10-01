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

import com.binh.dto.TypeDTO;
import com.binh.entity.Type;
import com.binh.form.type.CreatingTypeForm;
import com.binh.form.type.UpdatingTypeForm;
import com.binh.service.ITypeService;
import com.binh.validation.type.TypeIDExists;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/types")
public class TypeController {
	@Autowired
	private ITypeService service;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping()
	public ResponseEntity<?> getAllType(@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) Pageable pageable) {
		
		Page<Type> entityPages = service.getAllTypes(pageable);

		List<TypeDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<TypeDTO>>() {
		}.getType());

		Page<TypeDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> createType(@RequestBody CreatingTypeForm form){
		service.createType(form);
		return new ResponseEntity<>("Create successfully!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateType(@PathVariable(value = "id") @TypeIDExists Integer id,
											@RequestBody UpdatingTypeForm form){
		service.updateType(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteType(@PathVariable(value = "ids") List<Integer> ids){
		service.deleteType(ids);
		return new ResponseEntity<>("Delete successfully!", HttpStatus.OK);
	}
}
