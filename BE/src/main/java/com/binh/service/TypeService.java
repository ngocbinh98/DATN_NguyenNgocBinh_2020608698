package com.binh.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.binh.entity.Type;
import com.binh.form.type.CreatingTypeForm;
import com.binh.form.type.UpdatingTypeForm;
import com.binh.repository.ITypeRepository;

@Service
public class TypeService implements ITypeService{
	
	@Autowired
	private ITypeRepository repository;
	
	@Override
	public Page<Type> getAllTypes(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public void createType(CreatingTypeForm form) {
		Type typeForm = form.toEntity();
		repository.save(typeForm);
	}

	@Override
	public boolean isTypeExistsByTypeName(String typeName) {
		return repository.existsByTypeName(typeName);
	}

	@Override
	@Transactional
	public void updateType(Integer id, UpdatingTypeForm form) {
		Type typeEntity = repository.getById(id);
	    
	    String typeName = typeEntity.getTypeName();
	    
	    if (typeName == null || typeName.isEmpty()) {
	    	form.setTypeName(typeName);
	    }
	    
	    typeEntity.setTypeName(form.getTypeName());
	    
	    repository.save(typeEntity);
	}


	@Override
	@Transactional
	public void deleteType(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}

	@Override
	public boolean isTypeExistsByID(Integer id) {
		return repository.existsById(id);
	}
	
	public Type findByTypeName(String typeName) {
		return repository.findByTypeName(typeName);
	}
}
