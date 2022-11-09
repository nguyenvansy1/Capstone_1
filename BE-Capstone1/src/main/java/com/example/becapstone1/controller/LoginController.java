package com.example.becapstone1.controller;

import com.example.becapstone1.payload.request.LoginRequest;
import com.example.becapstone1.payload.response.JwtResponse;
import com.example.becapstone1.security.jwt.JwtServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private JwtServiceImpl jwtService;

    @PostMapping({"/auth/login"})
    public JwtResponse createJwtToken(@RequestBody LoginRequest loginRequest) throws Exception {
        return jwtService.createJwtToken(loginRequest);
    }
}
