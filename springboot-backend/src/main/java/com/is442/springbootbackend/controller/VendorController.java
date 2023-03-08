package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.Vendor;
import com.is442.springbootbackend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VendorController {
    @Autowired
    private VendorRepository vendorRepository;

    @GetMapping("/vendor")
    public List<Vendor> getAllUserGroups(){
        return vendorRepository.findAll();
    }


}
