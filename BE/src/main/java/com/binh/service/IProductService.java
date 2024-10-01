package com.binh.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.binh.entity.Product;
import com.binh.form.product.CreatingProductForm;
import com.binh.form.product.ProductFilterForm;
import com.binh.form.product.UpdatingProductForm;
import com.binh.form.product.UploadProductImageForm;

public interface IProductService {
	public Page<Product> getAllProducts(Pageable pageable, String search, String category, ProductFilterForm filter);

	public Product getProductByID(Integer id);

	public boolean isProductExistsByName(String name);

	public boolean isProductExistsByID(Integer id);

	public void createProduct(CreatingProductForm form);

	public void updateProduct(Integer id, UpdatingProductForm form);

	public void deleteProduct(List<Integer> ids);

	public void uploadImage(Integer id, UploadProductImageForm form);
}
