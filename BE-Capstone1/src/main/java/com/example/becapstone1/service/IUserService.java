package com.example.becapstone1.service;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

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
