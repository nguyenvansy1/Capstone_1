package com.example.becapstone1.service.Impl;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.EventUser;
import com.example.becapstone1.repository.IEventUserRepository;
import com.example.becapstone1.service.IEventUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventUserService implements IEventUserService {

    @Autowired
    private IEventUserRepository eventUserRepository;

    @Override
    public Page<EventUser> getListEventByUser(Long code, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("event_time_checkin").descending());
        return eventUserRepository.getListEventByUser(code,paging);
    }

    @Override
    public Page<EventUser> getListUserByEvent(Long id, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("event_time_checkin").descending());
        return eventUserRepository.getListUserByEvent(id,paging);
    }

    @Override
    public List<EventUser> getListUserByEvent1(Long id) {
        return eventUserRepository.getListUserByEvent1(id);
    }
}


