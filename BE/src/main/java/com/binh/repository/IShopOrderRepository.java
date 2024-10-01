package com.binh.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.binh.entity.ShopOrder;
import com.binh.entity.ShopOrderStatus;
import com.binh.entity.User;

public interface IShopOrderRepository extends JpaRepository<ShopOrder, Integer>, JpaSpecificationExecutor<ShopOrder>{
	public Page<ShopOrder> findByUserAndOrderStatus(User user, ShopOrderStatus orderStatus, Pageable pageable);
	
	public Page<ShopOrder> findByUser(User user, Pageable pageable);
	
	public void deleteByIdIn(List<Integer> ids);
	
	public List<ShopOrder> findAllByOrderStatus(ShopOrderStatus orderStatus);
}
