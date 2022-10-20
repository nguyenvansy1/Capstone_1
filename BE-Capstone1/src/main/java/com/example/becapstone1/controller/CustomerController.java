package com.example.becapstone1.controller;

import com.example.becapstone1.model.Course;
import com.example.becapstone1.model.Customer;
import com.example.becapstone1.service.Impl.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * CustomerController
 *
 * <p>Version 1.0
 *
 * <p>Date: 06-09-2022
 *
 * <p>Copyright
 *
 * <p>Modification Logs:
 * DATE             AUTHOR      DESCRIPTION
 * ----------------------------------------
 * 20-09-2022       SyNguyen     Create
 */

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    /** Get list customer. */
    @GetMapping("/list")
    public ResponseEntity<List<Customer>> getAllCustomer() {
        List<Customer> customerList = customerService.findAll();
        return new ResponseEntity<>(customerList,HttpStatus.OK);
    }

    /** Add Customer. */
    @PostMapping("/add")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) {
        try{
            customerService.addCustomer(customer);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
