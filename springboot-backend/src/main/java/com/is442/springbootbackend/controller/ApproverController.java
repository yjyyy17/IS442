package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.Approver;
import com.is442.springbootbackend.repository.ApproverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ApproverController {
    @Autowired
    private ApproverRepository approverRepository;

    //get all approver
    @GetMapping("/approver")
    public List<Approver> getAllApprovers(){
        return approverRepository.findAll();
    }

    //get approver by id
    @GetMapping("/approver/{id}")
    public ResponseEntity<Approver> getApproverById(@PathVariable Long id){
        Approver approver = approverRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Approver does not exist with id: " + id));
        return ResponseEntity.ok(approver);
    }

    //create new approver
    @PostMapping("/approver")
    public Approver createApprover(@RequestBody Approver approver){
        return approverRepository.save(approver);
    }

    //update approver by id
    @PutMapping("/approver/{id}")
    public ResponseEntity<Approver> updateApprover(@PathVariable Long id, @RequestBody Approver approverDetails) {
        Approver approver = approverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Approver does not exist with id :" + id));

        approver.setName(approverDetails.getName());
        approver.setEmail(approverDetails.getEmail());
        approver.setPhoneNo(approverDetails.getPhoneNo());
        approver.setPassword(approverDetails.getPassword());

        Approver updatedApprover = approverRepository.save(approver);
        return ResponseEntity.ok(updatedApprover);
    }

    //delete approver by id
    @DeleteMapping("/approver/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteApprover(@PathVariable Long id) {
        Approver approver = approverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Approver does not exist with id :" + id));

        approverRepository.delete(approver);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Approver with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
