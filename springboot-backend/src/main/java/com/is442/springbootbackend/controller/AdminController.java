package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.Admin;
import com.is442.springbootbackend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    //get all admins
    @GetMapping("/admin")
    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    //get admin by id
    @GetMapping("/admin/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id){
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin does not exist with id: " + id));
        return ResponseEntity.ok(admin);
    }

    //create new admin
    @PostMapping("/admin")
    public Admin createAdmin(@RequestBody Admin admin){
        return adminRepository.save(admin);
    }

    //update admin by id
    @PutMapping("/admin/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin does not exist with id :" + id));

        admin.setName(adminDetails.getName());
        admin.setEmail(adminDetails.getEmail());
        admin.setPhoneNo(adminDetails.getPhoneNo());
        admin.setPassword(adminDetails.getPassword());

        Admin updatedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }

    //delete admin by id
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAdmin(@PathVariable Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin does not exist with id :" + id));

        adminRepository.delete(admin);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Admin with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
