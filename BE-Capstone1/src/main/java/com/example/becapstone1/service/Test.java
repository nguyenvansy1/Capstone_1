package com.example.becapstone1.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Test {
    public static void main(String[] args) {
        String passwordEncode = new BCryptPasswordEncoder().encode("Ssy123456789");
        System.out.println("Password: " + passwordEncode );
    }
}
