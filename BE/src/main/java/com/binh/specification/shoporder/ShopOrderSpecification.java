package com.binh.specification.shoporder;

import java.util.Date;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import com.binh.entity.ShopOrder;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class ShopOrderSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<ShopOrder> buildWhere(Date minDate, Date maxDate, String filter) {
		
		//khởi tạo where
		Specification<ShopOrder> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		//Search
		if (!StringUtils.isEmpty(filter)) {
			filter = filter.trim();
			CustomSpecification orderStatus = new CustomSpecification("orderStatus", filter);
			where = where.and(orderStatus);
		}
		
		if (minDate != null) {
			CustomSpecification minCreatedDate = new CustomSpecification("minDate", minDate);
			where = where.and(minCreatedDate);
		}		
				
		// max created date
		if (maxDate != null) {
			CustomSpecification maxCreatedDate = new CustomSpecification("maxDate", maxDate);
			where = where.and(maxCreatedDate);
		}
		
		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<ShopOrder>{
	
	private static final long serialVersionUID = 1L;
	@NonNull
	private String field;
	@NonNull
	private Object value;
	@Override
	public Predicate toPredicate(
			Root<ShopOrder> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if(field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		if (field.equalsIgnoreCase("orderStatus")) {
			return criteriaBuilder.equal(root.get("orderStatus"), value);
		}
		if (field.equalsIgnoreCase("minDate")) {
			return criteriaBuilder.greaterThanOrEqualTo(
					root.get("orderDate").as(java.sql.Date.class),
					(Date) value);
		}
		if (field.equalsIgnoreCase("maxDate")) {
			return criteriaBuilder.lessThanOrEqualTo(
					root.get("orderDate").as(java.sql.Date.class),
					(Date) value);
		}
		return null;
	}
	
	
}