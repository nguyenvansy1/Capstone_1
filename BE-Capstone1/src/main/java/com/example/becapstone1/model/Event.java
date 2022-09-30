package com.example.becapstone1.model;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "eventName")
    private String name;

    private String location;

    private LocalDate date;

    private String title;

    private String content;

    @Column(columnDefinition = "Time")
    private String startTime;

    @Column(columnDefinition = "Time")
    private String endTime;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;

    public Event() {
    }

    public Event(Long id, String name, String location, LocalDate date, String title, String content, String startTime, String endTime, Customer customer) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.date = date;
        this.title = title;
        this.content = content;
        this.startTime = startTime;
        this.endTime = endTime;
        this.customer = customer;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
