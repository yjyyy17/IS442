package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}