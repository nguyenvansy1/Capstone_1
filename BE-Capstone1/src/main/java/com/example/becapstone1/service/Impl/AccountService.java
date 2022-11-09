package com.example.becapstone1.service.Impl;

import com.example.becapstone1.model.account.Account;
import com.example.becapstone1.repository.IAccountRepository;
import com.example.becapstone1.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AccountService implements IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public Optional<Account> findAccountById(Long id) {
        return iAccountRepository.findAccountById(id);
    }

    @Override
    public void changePassword(Long id, String password) {
        iAccountRepository.changePassword(id,password);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return iAccountRepository.existsByUsername(username);
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return iAccountRepository.findByUsername(username);
    }

    @Override
    public void addVerificationCode(String code, String username) {
        iAccountRepository.addVerificationCode(code, username);
    }

    @Override
    public Account findAccountByVerificationCode(String code) {
        return iAccountRepository.findAccountByVerificationCode(code);
    }

    @Override
    public void saveNewPassword(String password, String code) {
        iAccountRepository.saveNewPassword(password, code);
    }


}
