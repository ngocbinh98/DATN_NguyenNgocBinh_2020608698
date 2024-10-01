package com.binh.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.binh.entity.Payment;
import com.binh.entity.User;

public interface IPaymentService {
	public Page<Payment> getAllPayment(Pageable pageable);
	
	public Page<Payment> getAllPaymentByUser(User user, Pageable pageable);
	
	public void CreatePayment(Integer shopOrderId);
}
