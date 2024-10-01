package com.binh.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.binh.dto.ShoppingCartDTO;
import com.binh.entity.ShoppingCart;
import com.binh.entity.User;
import com.binh.service.IShoppingCartService;
import com.binh.service.IUserService;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/shoppingcarts")
public class ShoppingCartController {
	@Autowired
	private IShoppingCartService service;
	
	@Autowired
	private IUserService userService;

	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getShoppingCartByDate(Authentication authentication) {
		
		String username = authentication.getName();

		User myUser = userService.findUserByUsername(username);
		
		ShoppingCart cartEntity = service.getCartByDate(myUser);
		ShoppingCartDTO cartDTO = modelMapper.map(cartEntity, ShoppingCartDTO.class);
		return new ResponseEntity<>(cartDTO, HttpStatus.OK);
	}
	
	@PostMapping(value = "/{id}")
	public ResponseEntity<?> createShoppingCart(Authentication authentication, @PathVariable(name = "id") Integer productId){
		String username = authentication.getName();

		User myUser = userService.findUserByUsername(username);
		
		service.createShoppingCart(myUser, productId);
		return new ResponseEntity<>("Create successfully!!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateShoppingCart(@PathVariable(name = "id") Integer shoppingCartId, @RequestParam(name = "productId") Integer productId){
		service.addProductToShoppingCart(shoppingCartId, productId);
		return new ResponseEntity<>("Update cart successfully!!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/increase/{id}")
	public ResponseEntity<?> increaseProductQuantityInCart(@PathVariable(name = "id") Integer shoppingCartId, @RequestParam(name = "productId") Integer productId){
		service.increaseProductQuantityInCart(shoppingCartId, productId);
		return new ResponseEntity<>("Update cart successfully!!", HttpStatus.OK);
	}
	@PutMapping(value = "/decrease/{id}")
	public ResponseEntity<?> decreaseProductQuantityInCart(@PathVariable(name = "id") Integer shoppingCartId, @RequestParam(name = "productId") Integer productId){
		service.decreaseProductQuantityInCart(shoppingCartId, productId);
		return new ResponseEntity<>("Update cart successfully!!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/delete/{id}")
	public ResponseEntity<?> deleteProductInCart(@PathVariable(name = "id") Integer shoppingCartId, @RequestParam(name = "productId") Integer productId){
		service.deleteProductFromCart(shoppingCartId, productId);
		return new ResponseEntity<>("Update cart successfully!!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteShoppingCart(@PathVariable(name = "id") Integer cartId) {
		service.deleteShoppingCart(cartId);
		return new ResponseEntity<>("Delete cart successfully!!", HttpStatus.OK);
	}
}
