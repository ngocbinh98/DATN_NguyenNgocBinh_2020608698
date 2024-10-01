package com.binh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.binh.entity.ShopOrderItem;

public interface IShopOrderItemRepository extends JpaRepository<ShopOrderItem, Integer>, JpaSpecificationExecutor<ShopOrderItem>{

}
