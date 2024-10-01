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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.binh.dto.ProfileDTO;
import com.binh.dto.UserDTO;
import com.binh.entity.User;
import com.binh.form.user.CreatingUserByAdminForm;
import com.binh.form.user.CreatingUserForm;
import com.binh.form.user.UpdatingUserByAdminForm;
import com.binh.form.user.UpdatingUserForm;
import com.binh.form.user.UploadUserImageForm;
import com.binh.service.IUserService;
import com.binh.validation.user.UserIDExists;

import jakarta.validation.Valid;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/users")
public class UserController {
	@Autowired
	private IUserService service;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping()
	public ResponseEntity<?> getAllUsers(
			@PageableDefault(sort = { "id" }, direction = Sort.Direction.ASC) Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			@RequestParam(value = "role", required = false) String role) {
		
		Page<User> entityPages = service.getAllUsers(pageable, search, role);

		List<UserDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<UserDTO>>() {
		}.getType());

		Page<UserDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getUserByID(@PathVariable(name = "id") @UserIDExists Integer id) {

		User entity = service.getUserByID(id);

		UserDTO dto = modelMapper.map(entity, UserDTO.class);

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/getbyname/{username}")
	public ResponseEntity<?> getUserByUsername(@PathVariable(name = "username")  String name) {

		User entity = service.findUserByUsername(name);

		UserDTO dto = modelMapper.map(entity, UserDTO.class);

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	@GetMapping(value = "/id/{id}")
	public ResponseEntity<?> existsByID(@PathVariable(name = "id") Integer id) {
		boolean result = service.isUserExistsByID(id);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping(value = "/username/{username}")
	public ResponseEntity<?> existsByUsername(@PathVariable(name = "username") String username) {
		boolean result = service.isUserExistsByUsername(username);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateUser(@RequestBody UpdatingUserForm form, @PathVariable(name = "id") Integer id) {
		service.updateUser(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}

	@PutMapping(value = "/admin/{id}")
	public ResponseEntity<?> updateUserByAdmin(@RequestBody UpdatingUserByAdminForm form,
			@PathVariable(name = "id") Integer id) {
		service.updateUserByAdmin(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}

	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteUsers(Authentication authentication, @PathVariable(name = "ids") List<Integer> ids) {
		String username = authentication.getName();
		User user = service.findUserByUsername(username);
		service.deleteUsers(user.getId(), ids);
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}

	@GetMapping(value = "/email/{email}")
	public ResponseEntity<?> existsUserByEmail(@PathVariable(name = "email") String email){
		boolean result = service.existsUserByEmail(email);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PutMapping("/upload/{id}")
	public ResponseEntity<?>uploadUserImage(@PathVariable(name = "id") Integer id,@RequestBody UploadUserImageForm form){
		service.uploadImage(id, form);
		
		return new ResponseEntity<>("Upload image successfully!", HttpStatus.OK);
	}
	
	// người dùng tự đăng ký
	@PostMapping()
	public ResponseEntity<?> Register(@Valid @RequestBody CreatingUserForm dto) {
		// create User
		service.Register(dto.toEntity());

		return new ResponseEntity<>("We have sent an email. Please check email to active account!", HttpStatus.OK);
	}
	// Tạo người dùng bởi Admin
	@PostMapping(value = "/byAdmin")
	public ResponseEntity<?> createUserByAdmin(@Valid @RequestBody CreatingUserByAdminForm form) {

		service.createUserByAdmin(form);

		return new ResponseEntity<>("Create Successfully!", HttpStatus.OK);
	}

	// Kích hoạt User
	@GetMapping("/activeUser")
	// validate: check exists, check not expired
	public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
		// active user
		service.activeUser(token);

		return new ResponseEntity<>("Active success!", HttpStatus.OK);
	}

	// Gửi lại token tới gmail để yêu cầu kích hoạt User
	@GetMapping("/userRegistrationConfirmRequest")
	// validate: email exists, email not active
	public ResponseEntity<?> resendConfirmRegistrationViaEmail(@RequestParam String email) {

		service.sendConfirmUserRegistrationViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to active account!", HttpStatus.OK);
	}

	// Gửi mã token tới gmail để yêu cầu reset password
	@GetMapping("/resetPasswordRequest")
	// validate: email exists, email not active
	public ResponseEntity<?> sendResetPasswordViaEmail(@RequestParam String email) {

		service.resetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

	// resend reset password
	@GetMapping("/resendResetPassword")
	// validate: email exists, email not active
	public ResponseEntity<?> resendResetPasswordViaEmail(@RequestParam String email) {

		service.sendResetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

	//Lấy mã token từ nd được gửi vào gmail, chấp nhận reset password
	@GetMapping("/resetPassword")
	public ResponseEntity<?> resetPasswordViaEmail(@RequestParam String token, @RequestParam String newPassword) {

		// reset password
		service.resetPassword(token, newPassword);

		return new ResponseEntity<>("Reset Password success!", HttpStatus.OK);
	}

	@GetMapping(value = "/profile")
	public ResponseEntity<?> getUserProfile(Authentication authentication) {

		String username = authentication.getName();

		User user = service.findUserByUsername(username);

		ProfileDTO profileDTO = new ProfileDTO(user.getUsername(), user.getEmail(), user.getFirstName(),
				user.getLastName(), user.getAddress(), user.getPhone(), user.getRole().name(), user.getStatus().toString());
		return new ResponseEntity<>(profileDTO, HttpStatus.OK);
	}
}
