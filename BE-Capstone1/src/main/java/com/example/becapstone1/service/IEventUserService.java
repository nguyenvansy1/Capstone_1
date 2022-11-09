package com.example.becapstone1.service;

import com.example.becapstone1.model.event.EventUser;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IEventUserService {

    Page<EventUser> getListEventByUser(Long id, Integer page, Integer size);

    Page<EventUser> getListUserByEvent(Long id, Integer page, Integer size);

    List<EventUser> getListUserByEvent1(Long id);
}
