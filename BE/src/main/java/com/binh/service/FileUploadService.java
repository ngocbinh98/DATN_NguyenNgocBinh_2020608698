package com.binh.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class FileUploadService implements IFileUploadService {

	@Autowired
	private Cloudinary cloudinary;

	@Override
	public Map uploadFile(MultipartFile file, String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), 
            ObjectUtils.asMap(
                "folder", folderName
            ));
    }
	
	@Override
	public void deleteUserFile(String publicId) {
		try {
            cloudinary.uploader().destroy("user_image/" + publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            e.getMessage();
        }
	}
	
	@Override
	public void deleteProductFile(String publicId) {
		try {
            cloudinary.uploader().destroy("product_image/" + publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            e.getMessage();
        }
	}
}
