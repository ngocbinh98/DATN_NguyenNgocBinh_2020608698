package com.binh.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.binh.service.IFileUploadService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/v1/upload")
public class FileUploaderController {
	
	@Autowired
	private IFileUploadService service;
	
	@PostMapping()
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, 
                                         @RequestParam("folder") String folderName) throws IOException {
        return ResponseEntity.ok(service.uploadFile(file, folderName));
    }
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUserImage(@PathVariable(name = "id") String id){
		service.deleteUserFile(id);
		return new ResponseEntity<>("Delete successfully!",HttpStatus.OK);
	}
	@DeleteMapping("/product/{id}")
	public ResponseEntity<?> deleteProductImage(@PathVariable(name = "id") String id){
		service.deleteProductFile(id);
		return new ResponseEntity<>("Delete successfully!",HttpStatus.OK);
	}
}
