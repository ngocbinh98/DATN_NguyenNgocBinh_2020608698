package com.binh.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.binh.entity.Payment;
import com.binh.entity.User;

public interface IPaymentRepository extends JpaRepository<Payment, Integer>, JpaSpecificationExecutor<Payment>{
	public Page<Payment> findByUser(User user, Pageable pageable);
}
