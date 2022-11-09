package com.example.becapstone1.service;

import com.example.becapstone1.model.user.User;
import org.springframework.data.domain.Page;

public interface IUserService {
    Page<User> getAllUser(Integer page, Integer size);

    void updateUser(User user);

    void blockUser(Integer accountId);

    void unBlockUser(Integer accountId);

    User findUserByCode(Long code);
    
    Page<User> getByCodeOrName(String name, Integer page, Integer size);

    Integer[] getDataUser();

    Integer getAmountUser();


}
