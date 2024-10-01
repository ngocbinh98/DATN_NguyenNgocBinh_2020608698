package com.binh.service;

import jakarta.servlet.http.HttpServletRequest;

public interface IVNPAYService {
	public String createOrder(HttpServletRequest request, int amount, String orderInfor, String urlReturn);

	public int orderReturn(HttpServletRequest request);
}
