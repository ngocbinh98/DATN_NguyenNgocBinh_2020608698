package com.binh.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.binh.entity.User;

public interface IUserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User>{
	
	public boolean existsByUsername(String username);
	
	public boolean existsByEmail(String email);
	
	public Optional<User> findByUsername(String username);
	
	public User findByEmail(String email);
	
	public void deleteByIdIn(List<Integer> ids);	
}
