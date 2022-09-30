package com.example.becapstone1.repository;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IEventRepository extends JpaRepository<Event,Long> {
    Page<Event> findAll(Pageable pageable);

    @Query(value = "select month(date) as Month , count(month(date)) as Times from event\n" +
            "where year(date) = year(curdate())\n" +
            "group by month(date)\n" +
            "order by month(date)", nativeQuery = true)
    Integer[][] getData();
}
