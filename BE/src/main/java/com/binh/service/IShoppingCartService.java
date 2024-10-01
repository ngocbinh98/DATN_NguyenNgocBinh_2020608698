package com.binh.service;

import com.binh.entity.ShoppingCart;
import com.binh.entity.User;

public interface IShoppingCartService {
	public ShoppingCart getCartByDate(User user);
	
	public void createShoppingCart(User user, Integer productId);

	public void addProductToShoppingCart(Integer shoppingCartId, Integer productId);

	public void increaseProductQuantityInCart(Integer shoppingCartId, Integer productId);

	public void decreaseProductQuantityInCart(Integer shoppingCartId, Integer productId);
	
	public void deleteProductFromCart(Integer shoppingCartId, Integer productId);
	
	public void deleteShoppingCart(Integer cartId);
}
