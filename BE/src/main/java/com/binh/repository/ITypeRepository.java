package com.binh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.binh.entity.Type;

public interface ITypeRepository extends JpaRepository<Type, Integer>, JpaSpecificationExecutor<Type>{
	public Type findByTypeName(String typeName);

	public void deleteByIdIn(List<Integer> ids);

	public boolean existsByTypeName(String typeName);
}
