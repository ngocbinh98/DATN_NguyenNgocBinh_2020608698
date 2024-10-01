package com.binh.repository;

	import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.binh.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, Integer>, JpaSpecificationExecutor<Category> {

	public Category findByCategoryName(String categoryName);

	public void deleteByIdIn(List<Integer> ids);

	public boolean existsByCategoryName(String categoryName);
}