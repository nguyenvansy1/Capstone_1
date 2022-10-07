package com.example.becapstone1.service;

import com.example.becapstone1.model.User;
import org.springframework.data.domain.Page;

public interface IUserService {
    Page<User> getAllUser(Integer page, Integer size);

    void updateUser(User user);

    void deleteUser(Long code);

    User findUserByCode(Long code);

    Page<User> getByName(String name, Integer page, Integer size);

    Page<User> getByCode(String code, Integer page, Integer size);

    Page<User> getByCodeOrName(String name, Integer page, Integer size);

    Integer[][] getDataUser();
}
