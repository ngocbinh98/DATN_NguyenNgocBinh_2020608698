package com.binh.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.binh.service.IVNPAYService;

import jakarta.servlet.http.HttpServletRequest;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/VNPay")
public class VNPayController {

	@Autowired
	private IVNPAYService vnPayService;

	// Chuyển hướng người dùng đến cổng thanh toán VNPAY
	@PostMapping("/submitOrder")
	public ResponseEntity<?> submitOrder(@RequestParam("amount") int orderTotal,
			@RequestParam("orderInfo") String orderInfo, HttpServletRequest request) {
		String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
		String vnpayUrl = vnPayService.createOrder(request, orderTotal, orderInfo, "http://localhost:3000");

		Map<String, String> response = new HashMap<>();
		response.put("paymentUrl", vnpayUrl);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// Sau khi hoàn tất thanh toán, VNPAY sẽ chuyển hướng trình duyệt về URL này
	@GetMapping("/vnpay-payment-return")
	public ResponseEntity<?> paymentCompleted(HttpServletRequest request) {
		int paymentStatus = vnPayService.orderReturn(request);

		String orderInfo = request.getParameter("vnp_OrderInfo");
		String paymentTime = request.getParameter("vnp_PayDate");
		String transactionId = request.getParameter("vnp_TransactionNo");
		String totalPrice = request.getParameter("vnp_Amount");
		
//		VNPayDTO dto = new VNPayDTO(paymentStatus ,orderInfo, paymentTime, transactionId, totalPrice);
		
		Map<String, String> response = new HashMap<>();
		response.put("orderId", orderInfo);
		response.put("totalPrice", totalPrice);
		response.put("paymentTime", paymentTime);
		response.put("transactionId", transactionId);
		response.put("paymentStatus", paymentStatus == 1 ? "success" : "fail");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}