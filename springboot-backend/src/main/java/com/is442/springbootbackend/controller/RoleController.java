package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.Role;
import com.is442.springbootbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    //get all roles
    @GetMapping("/role")
    public List<Role> getAllRoles(){
        return roleRepository.findAll();
    }
}
