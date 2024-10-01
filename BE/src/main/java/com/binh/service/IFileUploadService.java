package com.binh.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface IFileUploadService {
	public Map uploadFile(MultipartFile file, String folderName) throws IOException;
	
	public void deleteUserFile(String publicId);

	public void deleteProductFile(String publicId);
}
