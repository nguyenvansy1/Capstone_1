package com.example.becapstone1.service.Impl;

import com.example.becapstone1.model.Customer;
import com.example.becapstone1.model.DataMail;
import com.example.becapstone1.repository.ICustomerRepository;
import com.example.becapstone1.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Autowired
    private DataMailService dataMailService;

    @Override
    public void addCustomer(Customer customer) throws IOException {
        customer.setAccount_id(4);
        iCustomerRepository.save(customer);
        try {
            DataMail dataMail = new DataMail();

            dataMail.setTo(customer.getEmail());
            dataMail.setSubject("Sự Kiện");

            Map<String, Object> props = new HashMap<>();
            props.put("username", customer.getEmail());
            props.put("password", 123456);
            dataMail.setProps(props);

            dataMailService.sendMail(dataMail,"Mail");

            System.out.println("Send Mail pass");
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
    }

    @Override
    public List<Customer> findAll() {
        return iCustomerRepository.findAll();
    }
}
