package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //get user by id
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));
        return ResponseEntity.ok(user);
    }

    //create new user
    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    //update user by id
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNo(userDetails.getPhoneNo());
        user.setPassword(userDetails.getPassword());


        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    //delete user by id
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}