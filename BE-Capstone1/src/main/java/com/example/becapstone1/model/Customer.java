package com.example.becapstone1.model;

import javax.persistence.*;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customerName")
    private String name;

    private String email;

    @Column(name = "account_id")
    private Integer account_id;
    public Customer() {
    }

    public Customer(Long id, String name, String email, Integer account_id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.account_id = account_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }
}
