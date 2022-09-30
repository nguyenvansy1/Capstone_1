package com.example.becapstone1.service.Impl;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.repository.IEventRepository;
import com.example.becapstone1.service.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EventService implements IEventService {
    @Autowired
    private IEventRepository iEventRepository;

    @Override
    public Page<Event> getAllEvent(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());
        return iEventRepository.findAll(paging);
    }

    @Override
    public void editEvent(Event event) {
        iEventRepository.save(event);
    }

    @Override
    public void addEvent(Event event) {
        iEventRepository.save(event);
    }
}
