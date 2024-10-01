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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.binh.dto.ProductDTO;
import com.binh.entity.Product;
import com.binh.form.product.CreatingProductForm;
import com.binh.form.product.ProductFilterForm;
import com.binh.form.product.UpdatingProductForm;
import com.binh.form.product.UploadProductImageForm;
import com.binh.service.IProductService;
import com.binh.service.IShopOrderService;
import com.binh.validation.product.ProductIDExists;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/products")
public class ProductController {
	@Autowired
	private IProductService service;

	@Autowired
	private IShopOrderService orderService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping()
	public ResponseEntity<?> getAllProduct(
			@PageableDefault(sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			@RequestParam(value = "category", required = false) String category,
			@RequestParam(value = "type", required = false) String type) {
		ProductFilterForm newForm = new ProductFilterForm(type);
		Page<Product> entityPages = service.getAllProducts(pageable, search, category, newForm);

		List<ProductDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<ProductDTO>>() {
		}.getType());

		Page<ProductDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

//	@GetMapping(value = "/apriori/{id}")
//	public ResponseEntity<?> getProductApriori(@PathVariable(name = "id") @ProductIDExists Integer id) {
//		Integer idResult = aprioriService.GetProductBySimpleApriori(orderService.getAll(), id);
//		if (idResult == 0)
//			return new ResponseEntity<>(idResult, HttpStatus.OK);
//		Product entity = service.getProductByID(idResult);
//		ProductDTO dto = modelMapper.map(entity, ProductDTO.class);
//		return new ResponseEntity<>(dto, HttpStatus.OK);
//	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getProductByID(@PathVariable(name = "id") @ProductIDExists Integer id) {

		Product entity = service.getProductByID(id);

		ProductDTO dto = modelMapper.map(entity, ProductDTO.class);

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	@GetMapping(value = "/id/{id}")
	public ResponseEntity<?> existsByID(@PathVariable(name = "id") Integer id) {
		boolean result = service.isProductExistsByID(id);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

//	@GetMapping(value = "/name/{productname}")
//	public ResponseEntity<?> existsByProductname(@PathVariable(name = "productname") String productName) {
//		boolean result = service.isProductExistsByName(productName);
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}
	@PostMapping()
	public ResponseEntity<?> createProduct(@RequestBody CreatingProductForm form) {
		service.createProduct(form);
		return new ResponseEntity<>("Create successfully!", HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateProduct(@RequestBody UpdatingProductForm form,
			@PathVariable(name = "id") Integer id) {
		service.updateProduct(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}
	
	@PutMapping("/upload/{id}")
	public ResponseEntity<?>uploadProductImage(@PathVariable(name = "id") Integer id, @RequestBody UploadProductImageForm form){
		service.uploadImage(id, form);
		
		return new ResponseEntity<>("Upload image successfully!", HttpStatus.OK);
	}

	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteProducts(@PathVariable(name = "ids") List<Integer> ids) {
		service.deleteProduct(ids);
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
}
