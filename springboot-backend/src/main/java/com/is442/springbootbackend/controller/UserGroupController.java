package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.UserGroup;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.repository.UserGroupRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserGroupController {
    @Autowired
    private UserGroupRepository userGroupRepository;
    @Autowired
    private WorkflowRepository workflowRepository;

    //get all user groups
    @GetMapping("/userGroup")
    public List<UserGroup> getAllUserGroups(){
        return userGroupRepository.findAll();
    }

}