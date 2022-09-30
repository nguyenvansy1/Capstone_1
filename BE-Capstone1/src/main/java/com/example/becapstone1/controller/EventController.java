package com.example.becapstone1.controller;

import com.example.becapstone1.model.Event;
import com.example.becapstone1.model.User;
import com.example.becapstone1.repository.IEventRepository;
import com.example.becapstone1.service.Impl.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserController
 *
 * <p>Version 1.0
 *
 * <p>Date: 06-09-2022
 *
 * <p>Copyright
 *
 * <p>Modification Logs:
 * DATE             AUTHOR      DESCRIPTION
 * ----------------------------------------
 * 22-09-2022       SyNguyen     Create
 */

@RestController
@RequestMapping("/api/event")
@CrossOrigin("*")
public class EventController {
    @Autowired
    private IEventRepository iEventRepository;

    @Autowired
    private EventService eventService;

    /** Get list event. */
    @GetMapping("/list")
    public ResponseEntity<Page<Event>> getAllUser(@RequestParam("page") Integer page,
                                                 @RequestParam("size") Integer size)
    {
        Page<Event> events = eventService.getAllEvent(page, size);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /** Add event. */
    @PostMapping("/add")
    public ResponseEntity<?> addEvent(@RequestBody Event event)
    {
        try{
            eventService.addEvent(event);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /** Get data event. */
    @GetMapping("/data")
    public ResponseEntity<?> getData()
    {
        Integer[][] data = iEventRepository.getData();
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
        return new ResponseEntity<>(arr, HttpStatus.OK);
    }

    /** Update event. **/
    @PatchMapping("/update")
    public ResponseEntity<?> editEvent(@RequestBody Event event)
    {
        try{
            eventService.editEvent(event);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
