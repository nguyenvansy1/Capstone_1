package com.example.becapstone1.service;

import com.example.becapstone1.model.Customer;

import java.util.List;

public interface ICustomerService {
    void addCustomer(Customer customer);

    List<Customer> findAll();
}
