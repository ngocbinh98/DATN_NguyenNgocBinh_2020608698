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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Type`")
@Data
@NoArgsConstructor
public class Type implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "typeName", length = 50, unique = true, nullable = false)
	private String typeName;
	
	@OneToMany(mappedBy = "type")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Product> products;
	
	public Type(String typeName){
		this.typeName = typeName;
	}
}
