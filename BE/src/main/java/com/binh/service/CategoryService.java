package com.binh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.binh.entity.Category;
import com.binh.form.category.CreatingCategoryForm;
import com.binh.form.category.UpdatingCategoryForm;
import com.binh.repository.ICategoryRepository;

@Service
public class CategoryService implements ICategoryService{

	@Autowired
	private ICategoryRepository repository; 
	
	@Override
	public Category findByCategoryName(String categoryName) {
		return repository.findByCategoryName(categoryName);
	}

	@Override
	public Page<Category> getAllCategorys(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public void createCategory(CreatingCategoryForm form) {
		Category categoryForm = form.toEntity();
		repository.save(categoryForm);
	}

	@Override
	public boolean isCategoryExistsByCategoryName(String categoryName) {
		return repository.existsByCategoryName(categoryName);
	}

	@Override
	@Transactional
	public void updateCategory(Integer id, UpdatingCategoryForm form) {
	    Category categoryEntity = repository.findById(id).get();
	    
	    String categoryName = categoryEntity.getCategoryName();
	    
	    if (categoryName == null || categoryName.isEmpty()) {
	    	form.setCategoryName(categoryName);
	    }
	    
	    categoryEntity.setCategoryName(form.getCategoryName());
	    
	    repository.save(categoryEntity);
	}


	@Override
	@Transactional
	public void deleteCategory(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}

	@Override
	public boolean isCategoryExistsByID(Integer id) {
		return repository.existsById(id);
	}

}
