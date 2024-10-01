package com.binh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.binh.entity.Category;
import com.binh.entity.Product;
import com.binh.entity.Type;
import com.binh.form.product.CreatingProductForm;
import com.binh.form.product.ProductFilterForm;
import com.binh.form.product.UpdatingProductForm;
import com.binh.form.product.UploadProductImageForm;
import com.binh.repository.ICategoryRepository;
import com.binh.repository.IProductRepository;
import com.binh.repository.ITypeRepository;
import com.binh.specification.product.ProductSpecification;

@Service
public class ProductService implements IProductService{

	@Autowired
	private IProductRepository repository;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Override
	public Page<Product> getAllProducts(Pageable pageable, String search, String category, ProductFilterForm filter) {
		Specification<Product> where = ProductSpecification.buildWhere(search, category, filter);
		
		return repository.findAll(where ,pageable);
	}

	@Override
	public Product getProductByID(Integer id) {
		return repository.findById(id).get();
		
	}

	@Override
	public boolean isProductExistsByName(String name) {
		return repository.existsByName(name);
	}

	@Override
	public boolean isProductExistsByID(Integer id) {
		return repository.existsById(id);
	}

	@Override
	public void createProduct(CreatingProductForm form) {
		Product prForm = form.toEntity();
		if(form.getType() != "" || !form.getType().isEmpty()) {
			Type newType = typeRepository.findByTypeName(form.getType());
			prForm.setType(newType);
		}
		if(form.getCategory() != "" || !form.getCategory().isEmpty()) {
			Category newCategory = categoryRepository.findByCategoryName(form.getCategory());
			prForm.setCategory(newCategory);
		}
		repository.save(prForm);
	}

	@Override
	@Transactional
	public void updateProduct(Integer id, UpdatingProductForm form) {
		Product productEntity = repository.getById(id);
	    
	    if (form.getName() == null || form.getName().isEmpty()) {
	    	form.setName(productEntity.getName());
	    }
	    if (form.getCollection() == null || form.getCollection().isEmpty()) {
	    	form.setCollection(productEntity.getCollection());
	    }
	    if (form.getSize() == null || form.getSize().isEmpty()) {
	    	form.setSize(productEntity.getSize());
	    }
	    if (form.getMaterial() == null || form.getMaterial().isEmpty()) {
	    	form.setMaterial(productEntity.getMaterial());
	    }
	    if (form.getDescription() == null || form.getDescription().isEmpty()) {
	    	form.setDescription(productEntity.getDescription());
	    }
	    if (form.getPrice() == null || form.getPrice() == 0) {
	    	form.setPrice(productEntity.getPrice());
	    }
	    if (form.getImage() == null || form.getImage().isEmpty()) {
	    	form.setImage(productEntity.getImage());
	    }
	    if(form.getType() != "" || !form.getType().isEmpty()) {
			Type newType = typeRepository.findByTypeName(form.getType());
			productEntity.setType(newType);
		}
		if(form.getCategory() != "" || !form.getCategory().isEmpty()) {
			Category newCategory = categoryRepository.findByCategoryName(form.getCategory());
			productEntity.setCategory(newCategory);
		}
	    
	    productEntity.setName(form.getName());
	    productEntity.setCollection(form.getCollection());
	    productEntity.setSize(form.getSize());
	    productEntity.setMaterial(form.getMaterial());
	    productEntity.setDescription(form.getDescription());
	    productEntity.setPrice(form.getPrice());
	    productEntity.setImage(form.getImage());
	    
	    repository.save(productEntity);
		
	}

	@Override
	@Transactional
	public void deleteProduct(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}

	@Override
	@Transactional
	public void uploadImage(Integer id, UploadProductImageForm form) {
		Product myProduct = repository.findById(id).get();
		myProduct.setImage(form.getImage());
		
		repository.save(myProduct);
	}
}
