package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}