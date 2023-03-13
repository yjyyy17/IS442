package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.UserGroup;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.repository.UserGroupRepository;
import com.is442.springbootbackend.repository.UserRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //create new user
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
        UserGroup userGroup = userGroupRepository.findById(userGroupId).get();
        User user = userRepository.findById(userId).get();
        userGroup.assignUser(user);
        return userGroupRepository.save(userGroup);



    }

    //update mapping for workflows
    @PutMapping("/userGroup/{userGroupId}/workflow/{workflowId}")
    public UserGroup assignWorkflows(@PathVariable Long userGroupId, @PathVariable Long workflowId){
        UserGroup userGroup = userGroupRepository.findById(userGroupId).get();
        Workflow workflow = workflowRepository.findById(workflowId).get();
        userGroup.assignWorkflow(workflow);
        return  userGroupRepository.save(userGroup);
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


}