package com.binh.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.binh.entity.Type;
import com.binh.form.type.CreatingTypeForm;
import com.binh.form.type.UpdatingTypeForm;

public interface ITypeService {
	public Page<Type> getAllTypes(Pageable pageable);

	public void createType(CreatingTypeForm form);

	public void updateType(Integer id, UpdatingTypeForm form);

	public void deleteType(List<Integer> ids);

	public boolean isTypeExistsByTypeName(String typeName);

	public boolean isTypeExistsByID(Integer id);
	
	public Type findByTypeName(String typeName);
}
