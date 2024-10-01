package com.binh.controller;

import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.binh.dto.ShopOrderDTO;
import com.binh.entity.ShopOrder;
import com.binh.entity.User;
import com.binh.form.shoporder.CreatingShopOrderForm;
import com.binh.service.IShopOrderService;
import com.binh.service.IUserService;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/shoporders")
public class ShopOrderController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IShopOrderService service;

	@Autowired
	private IUserService userService;

	@GetMapping()
	public ResponseEntity<?> getAllShopOrder(
			@PageableDefault(sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable,
			@RequestParam(value = "filter", required = false) String filter, 
			@RequestParam(value = "minDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd")Date minOrderDate,
			@RequestParam(value = "maxDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd")Date maxOrderDate) {
		Page<ShopOrder> entityPages = service.getAllShopOrders(minOrderDate, maxOrderDate, filter, pageable);

		List<ShopOrderDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<ShopOrderDTO>>() {
		}.getType());

		Page<ShopOrderDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

	@GetMapping(value = "/user")
	public ResponseEntity<?> getAllShopOrderByUser(Authentication authentication,
			@PageableDefault(sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable,
			@RequestParam(value = "filter", required = false) String filter) {
		String username = authentication.getName();

		User myUser = userService.findUserByUsername(username);
		Page<ShopOrder> entityPages = service.getAllShopOrdersByUser(myUser, filter, pageable);

		List<ShopOrderDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<ShopOrderDTO>>() {
		}.getType());

		Page<ShopOrderDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

	@PostMapping(value = "/{cartid}")
	public ResponseEntity<?> createShopOrderByCart(@PathVariable(value = "cartid") Integer cartId,
			@RequestBody CreatingShopOrderForm form) {
		Integer id = service.createShopOrderByCart(cartId, form);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@PostMapping(value = "/product/{id}")
	public ResponseEntity<?> createShopOrderByProduct(Authentication authentication,
			@PathVariable(value = "id") Integer productId, @RequestBody CreatingShopOrderForm form,
			@RequestParam(value = "quantity") int quantity) {
		String username = authentication.getName();

		User myUser = userService.findUserByUsername(username);
		Integer id = service.createShopOrderByProduct(myUser, productId, quantity, form);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteShopOrderById(@PathVariable(value = "ids") List<Integer> ids) {
		service.deleteShopOrder(ids);
		return new ResponseEntity<>("Delete successfully! ", HttpStatus.OK);
	}
	
	@GetMapping(value = "/totalprice")
	public ResponseEntity<?> getTotalPrice() {
		Long total = service.getTotalPrice();
		return new ResponseEntity<>(total, HttpStatus.OK);
	}
}
