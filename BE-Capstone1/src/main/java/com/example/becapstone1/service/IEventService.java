package com.example.becapstone1.service;

import com.example.becapstone1.model.Event;
import org.springframework.data.domain.Page;

public interface IEventService {
    Page<Event> getAllEvent(Integer page, Integer size);

    void editEvent(Event event);

    void addEvent(Event event);
}
