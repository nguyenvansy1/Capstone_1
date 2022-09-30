package com.example.becapstone1.repository;

import com.example.becapstone1.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {

    Page<User> findAll(Pageable pageable);

    @Query(value = "Select * from user where name like BINARY :name", nativeQuery = true)
    Page<User> findByNameContaining(@Param("name") String name, Pageable pageable);

    @Query(value = "Select * from user where student_code like :code", nativeQuery = true)
    Page<User> findByCodeContaining(@Param("code") String code, Pageable pageable);

    @Query(value = "Select * from user where student_code like :code and name like BINARY :name", nativeQuery = true)
    Page<User> findByCodeContainingAndNameContaining(@Param("code") String code,@Param("name") String name, Pageable pageable);

}


