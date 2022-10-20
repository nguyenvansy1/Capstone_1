package com.example.becapstone1.service.Impl;

import com.example.becapstone1.exception.EventNotFoundException;
import com.example.becapstone1.exception.UserNotFoundException;
import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.User;
import com.example.becapstone1.repository.IEventRepository;
import com.example.becapstone1.service.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public Integer[] getDataEvent() {
        Integer[][] data = iEventRepository.getDataEvent();
        Integer[] arr = new Integer[12];
        for (int i = 1 ; i<=12; i++){
            for(int row = 0; row < data.length; row++) {
                for(int column = 0; column < data[row].length-1; column++) {
                    if (i == data[row][column]) {
                        arr[i-1] = data[row][column+1];
                    }
                }
            }
        }
        for (int i = 0 ; i<12; i++) {
            if (arr[i] == null){
                arr[i] = 0;
            }
        }
        return arr;
    }

    @Override
    public List<Event> getListEventFinished() {
        return iEventRepository.getListEventFinished();
    }

    @Override
    public List<Event> getListEventUpcoming() {
        return iEventRepository.getListEventUpcoming();
    }

    @Override
    public Event findEventById(Long id) {
        return iEventRepository.findById(id).orElseThrow(() -> new EventNotFoundException("Event by id " + id + " was not found"));
    }
}
