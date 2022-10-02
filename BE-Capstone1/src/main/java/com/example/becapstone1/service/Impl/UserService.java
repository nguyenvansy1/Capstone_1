package com.example.becapstone1.service.Impl;

import com.example.becapstone1.exception.UserNotFoundException;
import com.example.becapstone1.model.User;
import com.example.becapstone1.repository.IUserRepository;
import com.example.becapstone1.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;



@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;


    @Override
    public Page<User> getAllUser(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("code").descending());
        return userRepository.findAll(paging);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long code) {
        userRepository.deleteById(code);
    }

    @Override
    public User findUserByCode(Long code) {
        return userRepository.findById(code).orElseThrow(() -> new UserNotFoundException("User by id " + code + " was not found"));
    }

    @Override
    public Page<User> getByName(String name, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size);
        Page<User> users = userRepository.findByNameContaining("%"+name+"%", paging);
        return users;
    }

    @Override
    public Page<User> getByCode(String code, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size);
        Page<User> users = userRepository.findByCodeContaining("%"+code+"%", paging);
        return users;
    }

    @Override
    public Page<User> getByCodeOrName( String name, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size);
        return userRepository.findByCodeContainingOrNameContaining("%"+name+"%",paging);
    }

    @Override
    public Integer[][] getDataUser() {
        return userRepository.getDataUser();
    }


}
