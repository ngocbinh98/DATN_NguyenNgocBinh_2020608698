package com.binh.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@RequiredArgsConstructor
public class AuthResponse {
    private final String token;
    private UserDetails userDetails;
    public AuthResponse(String jwt, UserDetails userDetails) {
        this.token = jwt;
        this.userDetails = userDetails;
    }
}
