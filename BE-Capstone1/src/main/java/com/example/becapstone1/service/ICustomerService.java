package com.example.becapstone1.service;

import com.example.becapstone1.model.Customer;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface ICustomerService {
    void addCustomer(Customer customer) throws IOException;

    List<Customer> findAll();
}
