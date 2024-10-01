package com.binh.specification.product;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.binh.entity.Product;
import com.binh.form.product.ProductFilterForm;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class ProductSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<Product> buildWhere(String search, String category, ProductFilterForm filter) {
		
		//khởi tạo where
		Specification<Product> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		//Search
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification name = new CustomSpecification("name", search);
			CustomSpecification size = new CustomSpecification("size", search);
			CustomSpecification collection = new CustomSpecification("collection", search);
			CustomSpecification material = new CustomSpecification("material", search);
			where = where.and((name).or(size).or(collection).or(material));
		}
		//Category
		if (!StringUtils.isEmpty(category)) {
			category = category.trim();
			CustomSpecification name = new CustomSpecification("category", category);
			where = where.and(name);
		}
		
		//filter
		if(filter == null || filter.getType() == "") {
			return where;
		}
		
		//filter type
		if(filter != null && filter.getType() != null) {
			CustomSpecification type = new CustomSpecification("type", filter.getType());
			where = where.and(type);
		}
		
		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<Product>{
	
	private static final long serialVersionUID = 1L;
	@NonNull
	private String field;
	@NonNull
	private Object value;
	@Override
	public Predicate toPredicate(
			Root<Product> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if(field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if(field.equalsIgnoreCase("name")) {
			return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
		}
		if(field.equalsIgnoreCase("category")) {
		    Expression<String> categoryNameExpression = root.get("category").get("categoryName");

		    return criteriaBuilder.equal(categoryNameExpression, value.toString());
		}
		if (field.equalsIgnoreCase("size")) {
			return criteriaBuilder.like(root.get("size"), "%" + value.toString() + "%");
		}

		if (field.equalsIgnoreCase("collection")) {
			return criteriaBuilder.like(root.get("collection"), "%" + value.toString() + "%");
		}

		if (field.equalsIgnoreCase("material")) {
			return criteriaBuilder.like(root.get("material"), "%" + value.toString() + "%");
		}
		
		if(field.equalsIgnoreCase("type")) {
		    // Tạo một biểu thức tham chiếu đến đối tượng Type từ đối tượng Product
		    Expression<String> typeNameExpression = root.get("type").get("typeName");
		    // So sánh typeName với giá trị từ form
		    return criteriaBuilder.equal(typeNameExpression, value.toString());
		}

		
		return null;
	}
	
	
}