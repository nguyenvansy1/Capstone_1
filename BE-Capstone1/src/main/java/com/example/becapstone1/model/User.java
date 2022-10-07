package com.example.becapstone1.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user")
public class User  {
    @Id
    @Column(name = "studentCode")
    private Long code;

    private String name;

    private Integer identityCard;

    private String phone;

    private LocalDate birthDay;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "majorsId")
    private Majors majors;


    public User() {
    }

    public User(Long code, String name, Integer identityCard, String phone, LocalDate birthDay, Course course, Majors majors) {
        this.code = code;
        this.name = name;
        this.identityCard = identityCard;
        this.phone = phone;
        this.birthDay = birthDay;
        this.course = course;
        this.majors = majors;
    }

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIdentityCard() {
        return identityCard;
    }

    public void setIdentityCard(Integer identityCard) {
        this.identityCard = identityCard;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Majors getMajors() {
        return majors;
    }

    public void setMajors(Majors majors) {
        this.majors = majors;
    }
}
