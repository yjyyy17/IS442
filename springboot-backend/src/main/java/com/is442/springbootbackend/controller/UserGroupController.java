package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import java.text.ParseException;

import com.is442.springbootbackend.model.*;
import com.is442.springbootbackend.repository.UserGroupRepository;
import com.is442.springbootbackend.repository.UserRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;

import java.util.*;
import java.lang.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserGroupController {
    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkflowRepository workflowRepository;


    //get all user groups
    // returns list of UserGroup objects that show the usergroup and assigned workflows without the due date
    @GetMapping("/userGroup")
    public List<UserGroup> getAllUserGroups(){
        return userGroupRepository.findAll();
    }

    //get user group by id
    @GetMapping("/userGroup/{id}")
    public ResponseEntity<UserGroup> getUserGroupById(@PathVariable Long id){
        UserGroup userGroup = userGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Group does not exist with id : " + id));
        return ResponseEntity.ok(userGroup);
    }

    //create new user group
    @PostMapping("/userGroup")
    public UserGroup createUserGroup(@RequestBody UserGroup userGroup){
        return userGroupRepository.save(userGroup);
    }

    //update user group by id
//    @PutMapping("/userGroup/{id}")
//    public ResponseEntity<UserGroup> updateUserGroup(@PathVariable Long id, @RequestBody UserGroup userGroupDetails){
//        UserGroup userGroup = userGroupRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User Group does not exist with id : " + id));
//
//        UserGroup updatedUserGroup = userGroupRepository.save(userGroup);
//        return ResponseEntity.ok(updatedUserGroup);
//    }

    //update mapping for users
    @PutMapping("/userGroup/{userGroupId}/user/{userId}")
    public UserGroup assignUsers(@PathVariable Long userGroupId, @PathVariable Long userId){
        UserGroup userGroup = userGroupRepository.findById(userGroupId).orElseThrow(() -> new ResourceNotFoundException("User group does not exist with id : " + userGroupId));
        User user = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User does not exist with id : " + userId));
        userGroup.assignUser(user);
        return userGroupRepository.save(userGroup);



    }

    //update mapping for workflows
    @PutMapping("/userGroup/{userGroupId}/workflow/{workflowId}")
    public UserGroup assignWorkflows(@PathVariable Long userGroupId, @PathVariable Long workflowId) throws ParseException{
//        try{
            UserGroup userGroup = userGroupRepository.findById(userGroupId).orElseThrow(() -> new ResourceNotFoundException("User group does not exist with id : " + userGroupId));
            Workflow workflow = workflowRepository.findById(workflowId).orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + workflowId));
            userGroup.assignWorkflow(workflow);
            return userGroupRepository.save(userGroup);

    }

    //delete user group by id
    @DeleteMapping("/userGroup/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUserGroup(@PathVariable Long id){
        UserGroup userGroup = userGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Group does not exist with id : " + id));
        userGroupRepository.delete(userGroup);
        Map<String, Boolean> response = new HashMap<>();
        response.put("User Group with id " + id + " has been deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


    //soft delete userGroup by usergroupID

    @PutMapping("/usergroup/delete/{id}")
    public ResponseEntity<?> softDeleteUserGroup(@PathVariable long id){
        UserGroup userGroup = userGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id : " + id));

        userGroup.setStatus("Inactive");
        userGroupRepository.save(userGroup);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Status", Boolean.TRUE );
        return ResponseEntity.ok(response);
    }

}