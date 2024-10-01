package com.binh.controller;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.binh.dto.PaymentDTO;
import com.binh.entity.Payment;
import com.binh.entity.User;
import com.binh.service.IPaymentService;
import com.binh.service.IUserService;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/payments")
public class PaymentController {
	@Autowired
	private IPaymentService service;
	
	@Autowired
	private IUserService userService;

	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllPayment(@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) Pageable pageable) {
		
		Page<Payment> entityPages = service.getAllPayment(pageable);

		List<PaymentDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<PaymentDTO>>() {
		}.getType());

		Page<PaymentDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	@GetMapping(value = "/byUser")
	public ResponseEntity<?> getAllPaymentByUser(Authentication authentication, @PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) Pageable pageable) {
		
		String username = authentication.getName();

		User myUser = userService.findUserByUsername(username);
		
		Page<Payment> entityPages = service.getAllPaymentByUser(myUser, pageable);

		List<PaymentDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<PaymentDTO>>() {
		}.getType());

		Page<PaymentDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@PostMapping(value = "/shoporder/{id}")
	public ResponseEntity<?> createPayment(@PathVariable(name = "id") Integer shopOrderId) {
		service.CreatePayment(shopOrderId);
		return new ResponseEntity<>("Create successfully!!", HttpStatus.OK);
	} 
	
}
