package com.example.becapstone1.controller;

import com.example.becapstone1.model.Course;
import com.example.becapstone1.model.Majors;
import com.example.becapstone1.model.User;
import com.example.becapstone1.service.Impl.CourseService;
import com.example.becapstone1.service.Impl.MajorsService;
import com.example.becapstone1.service.Impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * UserController
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
 * 06-09-2022       SyNguyen     Create
 */

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private MajorsService majorsService;

    @Autowired
    private CourseService courseService;


    /** Get list user. */
    @GetMapping("/list")
    public ResponseEntity<Page<User>> getAllUser(@RequestParam("page") Integer page,
                                                 @RequestParam("size") Integer size)
    {
        Page<User> userList = userService.getAllUser(page, size);
        return new ResponseEntity<>(userList,HttpStatus.OK);
    }


    /** Update user. */
    @PatchMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user)
    {
        try{
            userService.updateUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /** Delete user. */
    @DeleteMapping("/delete/{code}")
    public ResponseEntity<?> deleteUser(@PathVariable("code") Long code) {
        try {
            userService.deleteUser(code);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /** Find user by id. */
    @GetMapping("/find/{code}")
    public ResponseEntity<?> findUserById(@PathVariable("code") Long code) {
        try {
            User user =  userService.findUserByCode(code);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /** Find user by name. */
    @GetMapping("/searchName")
    public ResponseEntity<Page<User>> getAllUserByName(@RequestParam("page") Integer page,
                                                               @RequestParam("size") Integer size , @RequestParam("name") String name) {
        System.out.println(name);
        Page<User> users = userService.getByName(name , page, size);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /** Find user by name. */
    @GetMapping("/searchCode")
    public ResponseEntity<Page<User>> getAllUserByCode(@RequestParam("page") Integer page,
                                                           @RequestParam("size") Integer size , @RequestParam("code") String code) {
        Page<User> users = userService.getByCode(code , page, size);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /** Get list course **/
    @GetMapping("/course")
    public ResponseEntity<List<Course>> getAllCourse() {
        List<Course> courseList = courseService.findAllCourse();
        return new ResponseEntity<>(courseList,HttpStatus.OK);
    }

    /** Get list majors **/
    @GetMapping("/majors")
    public ResponseEntity<List<Majors>> getAllMajors() {
        List<Majors> majorsList = majorsService.findAllMajors();
        return new ResponseEntity<>(majorsList,HttpStatus.OK);
    }

    /** Find user by name and code. */
    @GetMapping("/filter")
    public ResponseEntity<Page<User>> getAllUserByCodeAndName(@RequestParam("page") Integer page,
                                                       @RequestParam("size") Integer size , @RequestParam("code") String code, @RequestParam("name") String name) {
        Page<User> users = userService.getByCodeAndName(code,name,page,size);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
