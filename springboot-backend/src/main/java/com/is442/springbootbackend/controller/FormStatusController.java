package com.is442.springbootbackend.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import com.is442.springbootbackend.model.FormStatus;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.FormStatusId;
import com.is442.springbootbackend.repository.FormStatusRepository;
import com.is442.springbootbackend.repository.FormTemplateRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import com.is442.springbootbackend.repository.UserRepository;
import com.is442.springbootbackend.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FormStatusController {

    @Autowired
    private FormStatusRepository formStatusRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/formstatus")
    public List<FormStatus> getAllForm() {
        return formStatusRepository.findAll();
    }

    // Get a specific FormStatus record by workflowID, and userID
    // RequestParam: ?workflowId=1&userId=2
    @GetMapping("formstatusByWorkflowAndUser")
    public ResponseEntity<FormStatus> getFormStatusById(
            @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByWorkflowWorkflowIdAndUserUserId(workflowId, userId);
        if (formStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // Get a specific FormStatus record by formID, workflowID, and userID
    // RequestParam: ?formId=1&workflowId=1&userId=2
    @GetMapping("formstatusByIds")
    public ResponseEntity<FormStatus> getFormStatusById(
            @RequestParam int formId, @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if (formStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(formStatus);
    }

    // create new form status
//    JSON format:
//    {
//        "form": {
//            "formId": 1
//        },
//        "user": {
//            "userId": 1
//        },
//        "workflow": {
//            "workflowId": 1
//        },
//        "evaluationStatus": "Rejected",
//        "rejectionPersonnel": 1,
//        "rejectionComments": "Anyhow"
//    }
    @PostMapping(path = "/formstatus")
    public ResponseEntity<String> createFormStatus(@RequestBody FormStatus formStatus) {

        int formId = formStatus.getForm().getFormId();
        long userId = formStatus.getUser().getUserId();
        long workflowId = formStatus.getWorkflow().getWorkflowId();

        FormTemplate formtemplate = (FormTemplate) formTemplateRepository.findById(formId).orElse(null);
        if (formtemplate != null) {
            formStatus.setForm(formtemplate);
        } else {
            return ResponseEntity.badRequest().body("Form with ID " + formId + " does not exist.");
        }

        Workflow workflow = (Workflow) workflowRepository.findById(workflowId).orElse(null);
        formStatus.setWorkflow(workflow);
        if (workflow != null) {
            formStatus.setWorkflow(workflow);
        } else {
            return ResponseEntity.badRequest().body("Workflow with ID " + workflowId + " does not exist.");
        }

        User user = (User) userRepository.findById(userId).orElse(null);
        if (user != null) {
            formStatus.setUser(user);
        } else {
            return ResponseEntity.badRequest().body("User with ID " + userId + " does not exist.");
        }

        try{
            formStatusRepository.save(formStatus);
            return ResponseEntity.ok().body("Successfully created.");
        }
        catch(DataAccessException e){
            return ResponseEntity.badRequest().body("Error creating form status.");
        }
    }

    // Update an existing FormStatus record
//     @RequestParam: ?formId=1&workflowId=1&userId=2
//     JSON:
//    {
//        "evaluationStatus": "Approved 3",
//        "rejectionPersonnel": 1,
//        "rejectionComments": null
//    }
    @PutMapping("/formstatus")
    public ResponseEntity<String> updateFormStatus(@RequestParam int formId,
                                                   @RequestParam long workflowId, @RequestParam long userId,
                                                   @RequestBody FormStatus formStatusDetails) throws ResourceNotFoundException {
        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if(formStatus!=null){
            // update evaluation status, rejection personnel, and rejection comments
            formStatus.setEvaluationStatus(formStatusDetails.getEvaluationStatus());
            formStatus.setRejectionPersonnel(formStatusDetails.getRejectionPersonnel());
            formStatus.setRejectionComments(formStatusDetails.getRejectionComments());

            final FormStatus updatedFormStatus = formStatusRepository.save(formStatus);
            return ResponseEntity.ok().body("Successfully saved.");
        }
        else{
            return ResponseEntity.badRequest().body("Error saving form status.");
        }
    }

    // Delete a FormStatus record
    // @RequestParam: ?formId=1&workflowId=1&userId=2
    @DeleteMapping("/formstatus")
    public ResponseEntity<String> deleteFormStatus(
            @RequestParam int formId,
            @RequestParam long workflowId, @RequestParam long userId) {

        FormStatus formStatus = formStatusRepository.findByFormFormIdAndWorkflowWorkflowIdAndUserUserId(formId, workflowId, userId);
        if(formStatus != null) {
            formStatusRepository.delete(formStatus);
            return ResponseEntity.ok().body("Successfully deleted.");
        }
        else{
//            return ResponseEntity.badRequest().body("Error deleting form status.");
            return ResponseEntity.badRequest().body("Error deleting form status.");
        }

    }

}