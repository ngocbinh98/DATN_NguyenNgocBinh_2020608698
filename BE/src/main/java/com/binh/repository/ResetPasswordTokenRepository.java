package com.binh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.binh.entity.ResetPasswordToken;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Integer> {
	
	public ResetPasswordToken findByToken(String token);

	public boolean existsByToken(String token);

	@Query("	SELECT 	token	"
			+ "	FROM 	ResetPasswordToken "
			+ " WHERE 	user.id = :userId")
	public String findByUserId(@Param("userId") Integer userId);
	
	@Transactional
	@Modifying
	@Query("	DELETE 						" 
			+ "	FROM 	ResetPasswordToken 	" 
			+ " WHERE 	user.id = :userId")
	public void deleteByUserId(@Param("userId") Integer userId);

}
