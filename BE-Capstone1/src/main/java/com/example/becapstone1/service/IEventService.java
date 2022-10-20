package com.example.becapstone1.service;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IEventService {
    Page<Event> getAllEvent(Integer page, Integer size);

    void editEvent(Event event);

    void addEvent(Event event);

    Integer[] getDataEvent();

    List<Event> getListEventFinished();

    List<Event> getListEventUpcoming();

    Event findEventById(Long id);

}
