package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.Vendor;
import com.is442.springbootbackend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VendorController {
    @Autowired
    private VendorRepository vendorRepository;

    //get all vendors
    @GetMapping("/vendor")
    public List<Vendor> getAllVendors(){
        return vendorRepository.findAll();
    }

    //get vendor by id
    @GetMapping("/vendor/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id){
        Vendor vendor = vendorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id: " + id));
        return ResponseEntity.ok(vendor);
    }

    //create new vendor
    @PostMapping("/vendor")
    public Vendor createVendor(@RequestBody Vendor vendor){
        return vendorRepository.save(vendor);
    }

    //update vendor by id
    @PutMapping("/vendor/{id}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendorDetails) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + id));

        vendor.setName(vendorDetails.getName());
        vendor.setEmail(vendorDetails.getEmail());
        vendor.setPhoneNo(vendorDetails.getPhoneNo());
        vendor.setPassword(vendorDetails.getPassword());
        vendor.setAddress(vendorDetails.getAddress());
        vendor.setIndustry(vendorDetails.getIndustry());

        Vendor updatedVendor = vendorRepository.save(vendor);
        return ResponseEntity.ok(updatedVendor);
    }

    //delete vendor by id
    @DeleteMapping("/vendor/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteVendor(@PathVariable Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + id));

        vendorRepository.delete(vendor);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Vendor with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
