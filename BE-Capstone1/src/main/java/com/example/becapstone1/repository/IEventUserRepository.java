package com.example.becapstone1.repository;

import com.example.becapstone1.model.event.EventUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IEventUserRepository extends JpaRepository<EventUser, Long> {

    @Query(value = "select * from event_user\n" +
            "where user_id =:id", nativeQuery = true)
    Page<EventUser> getListEventByUser(@Param("id") Long id, Pageable pageable);

    @Query(value = "select * from event_user\n" +
            "where event_id = :id", nativeQuery = true)
    Page<EventUser> getListUserByEvent(@Param("id") Long id, Pageable pageable);

    @Query(value = "select * from event_user\n" +
            "where event_id = :id", nativeQuery = true)
    List<EventUser> getListUserByEvent1(@Param("id") Long id);
}
