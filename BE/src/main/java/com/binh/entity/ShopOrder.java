package com.binh.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`ShopOrder`")
@Data
@NoArgsConstructor
public class ShopOrder implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "orderDate", nullable = false)
	@Temporal(TemporalType.DATE)
	@CreationTimestamp
	private Date orderDate;
	
	@Column(name ="`totalPrice`", nullable = false)
	private Integer totalPrice;
	
	@Column(name ="`addressShipping`", length = 100, nullable = false)
	private String addressShipping;

	@Column(name ="`phoneNumberShip`", length = 100, nullable = true)
	private String phoneNumberShip;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "`orderStatus`", nullable = false)
	private ShopOrderStatus orderStatus = ShopOrderStatus.NOT_PAY;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
	
	@OneToOne(mappedBy = "shopOrder")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Payment payment;
	
	@OneToMany(mappedBy = "shopOrder")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShopOrderItem> shopOrderItems;
	
}
