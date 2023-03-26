package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import java.text.ParseException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.UserGroup;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.UserGroup_Workflows;
import com.is442.springbootbackend.repository.UserGroupRepository;
import com.is442.springbootbackend.repository.UserRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import com.is442.springbootbackend.repository.UserGroup_WorkflowsRepository;
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

    @Autowired
    private UserGroup_WorkflowsRepository userGroup_WorkflowsRepository;

    //get all user groups
    // returns list of UserGroup objects that show the usergroup and assigned workflows without the due date
    @GetMapping("/userGroup")
    public List<UserGroup> getAllUserGroups(){
        return userGroupRepository.findAll();
    }

    //get user group by id
    // returns list of UserGroup_Workflows objects that show the usergroup, workflows and their duedates
    @GetMapping("/userGroup/{id}")
    public ResponseEntity<List<UserGroup_Workflows>> getUserGroupById(@PathVariable Long id){
        UserGroup userGroup = userGroupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Group does not exist with id : " + id));
        List<UserGroup_Workflows> userGroupWorkflows = userGroup_WorkflowsRepository.findByUsergroupUserGroupId(id);
        return ResponseEntity.ok(userGroupWorkflows);
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
//    {
//        "dueDate": "2023-03-16"
//    }
    @PutMapping("/userGroup/{userGroupId}/workflow/{workflowId}")
    public UserGroup_Workflows assignWorkflows(@PathVariable Long userGroupId, @PathVariable Long workflowId, @RequestBody Map<String, Date> reqBody) throws ParseException{
//        try{
            UserGroup userGroup = userGroupRepository.findById(userGroupId).orElseThrow(() -> new ResourceNotFoundException("User group does not exist with id : " + userGroupId));
            Workflow workflow = workflowRepository.findById(workflowId).orElseThrow(() -> new ResourceNotFoundException("Workflow does not exist with id : " + workflowId));
            userGroup.assignWorkflow(workflow);
            userGroupRepository.save(userGroup);

            Date dbDueDate = reqBody.get("dueDate");

            // Check if the mapping already exists, and update the due date if it does.
            UserGroup_Workflows userGroupWorkflows = (UserGroup_Workflows) userGroup_WorkflowsRepository.findByUsergroupUserGroupIdAndWorkflowWorkflowId(userGroupId, workflowId);
            if(userGroupWorkflows != null){
                userGroupWorkflows.setDueDate(dbDueDate);
            }
            else{
                // if doesnt exist, create a new row in the User_group_Workflows table
                userGroupWorkflows = new UserGroup_Workflows(workflow, userGroup, dbDueDate);
            }
//            userGroup_WorkflowsRepository.save(userGroupWorkflows);
//            return (UserGroup_Workflows) userGroup_WorkflowsRepository.findByUsergroupUserGroupIdAndWorkflowWorkflowId(userGroupId, workflowId);

            return userGroup_WorkflowsRepository.save(userGroupWorkflows);
//        }catch(ParseException pe){
//            throw new ParseException("Invalid input for due date", pe.getErrorOffset());
//        }
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

    // to get all usergroups, workflows and duedates (for overdue email functionality)
    @GetMapping("/usergroup_workflow")
    public List<UserGroup_Workflows> getAllUserGroup_Workflows(){
        return userGroup_WorkflowsRepository.findAll();
    }

}