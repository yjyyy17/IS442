package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class WorkflowController {
    @Autowired
    private WorkflowRepository workflowRepository;

    //get all workflows
    @GetMapping("/workflow")
    public List<Workflow> getAllWorkflows(){
        return workflowRepository.findAll();
    }

    //get workflow by id
    @GetMapping("/workflow/{id}")
    public ResponseEntity<Workflow> getWorkflowById(@PathVariable Long id){
        Workflow workflow = workflowRepository.findById(id)
                . orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + id));
        return ResponseEntity.ok(workflow);
    }

    //create new workflow
    @PostMapping("/workflow")
    public Workflow createWorkflow(@RequestBody Workflow workflow){
        return workflowRepository.save(workflow);
    }

    //update workflow by id
    @PutMapping("/workflow/{id}")
    public ResponseEntity<Workflow> updateWorkflow(@PathVariable Long id, @RequestBody Workflow workflowDetails){
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + id));

        workflow.setDescription(workflowDetails.getDescription());
        workflow.setTitle(workflowDetails.getTitle());


        Workflow updatedWorkflow = workflowRepository.save(workflow);
        return ResponseEntity.ok(updatedWorkflow);
    }

    //delete user by id
    @DeleteMapping("/workflow/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteWorkflow(@PathVariable Long id){
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + id));
        workflowRepository.delete(workflow);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Workflow with id " + id + " has been deleted", Boolean.TRUE );
        return ResponseEntity.ok(response);
    }

    //soft delete workflows by workflowID

    @PutMapping("/workflow/delete/{id}")
    public ResponseEntity<?> softDeleteWorkFlow(@PathVariable long id){
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + id));

        Map<String, Boolean> response = new HashMap<>();
        response.put("Status", Boolean.TRUE );
        return ResponseEntity.ok(response);
    }


}