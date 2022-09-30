package com.example.becapstone1.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Majors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "majorsName")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "majors")
    private Set<User> users;

    public Majors() {
    }

    public Majors(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
