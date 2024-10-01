package com.binh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.binh.entity.Payment;
import com.binh.entity.ShopOrder;
import com.binh.entity.ShopOrderStatus;
import com.binh.entity.User;
import com.binh.repository.IPaymentRepository;
import com.binh.repository.IShopOrderRepository;

@Service
public class PaymentService implements IPaymentService{

	@Autowired
	private IPaymentRepository repository;
	
	@Autowired
	private IShopOrderRepository shopOrderRepository;
	
	
	@Override
	public Page<Payment> getAllPayment(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public Page<Payment> getAllPaymentByUser(User user, Pageable pageable) {
		return repository.findByUser(user, pageable);
	}

	@Override
	public void CreatePayment(Integer shopOrderId) {
		ShopOrder shopOrderEntity = shopOrderRepository.findById(shopOrderId).get();
		shopOrderEntity.setOrderStatus(ShopOrderStatus.PAY);
		Payment newPayment = new Payment(shopOrderEntity.getUser(), shopOrderEntity);
		
		repository.save(newPayment);
		shopOrderRepository.save(shopOrderEntity);
	}

}
