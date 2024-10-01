package com.binh.entity;

import java.io.Serializable;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`ShopOrderItem`")
@Data
@NoArgsConstructor
public class ShopOrderItem implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "quantity", nullable = false)
	private Integer quantity;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`productId`")
	private Product product;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`shopOrderId`")
	private ShopOrder shopOrder;
	
	public ShopOrderItem(Integer quantity, Product product, ShopOrder shopOrder) {
		this.quantity = quantity;
		this.product = product;
		this.shopOrder = shopOrder;
	}
}
