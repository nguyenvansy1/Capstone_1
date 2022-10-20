package com.example.becapstone1.model;

import javax.persistence.*;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer id;

    @Column(name = "account_username")
    private String username;

    @Column(name = "account_password")
    private String password;

    @Column(name = "account_status")
    private Boolean status;

    @Column(name = "account_email")
    private String email;
    public Account() {
    }

    public Account(Integer id, String username, String password, Boolean status, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.status = status;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
