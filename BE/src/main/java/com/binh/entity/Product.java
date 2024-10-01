package com.binh.entity;

import java.io.Serializable;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Product`")
@Data
@NoArgsConstructor
public class Product implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", length = 100, unique = true, nullable = false)
	private String name;
	
	@Column(name = "collection", length = 50, nullable = true)
	private String collection;
	
	@Column(name = "size", length = 50, nullable = false)
	private String size;
	
	@Column(name = "material", length = 50, nullable = false)
	private String material;
	
	@Column(name = "description", length = 200, nullable = false)
	private String description;
	
	@Column(name = "price", nullable = false)
	private Integer price;
	
	@Column(name = "image", nullable = true)
	private String image;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`categoryId`")
	private Category category;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`typeId`")
	private Type type;
	
	@OneToMany(mappedBy = "product")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShoppingCartItem> shoppingCartItems;
	
	@OneToMany(mappedBy = "product")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShopOrderItem> shopOrderItems;
	
	public Product(String name,String collection,String size, String material, String description, Integer price, String image) {
		this.name = name;
		this.collection = collection;
		this.size = size;
		this.material = material;
		this.description = description;
		this.price = price;
		this.image = image;
	}
}
