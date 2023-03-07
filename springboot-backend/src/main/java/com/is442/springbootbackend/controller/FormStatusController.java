package com.is442.springbootbackend.controller;

import java.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import com.is442.springbootbackend.model.FormStatus;
import com.is442.springbootbackend.model.FormStatusMapping;
import com.is442.springbootbackend.repository.FormStatusRepository;
import com.is442.springbootbackend.repository.FormTemplateRepository;
import com.is442.springbootbackend.repository.WorkflowRepository;
import com.is442.springbootbackend.repository.UserRepository;
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

    @GetMapping(path="/formstatus")
    public List<FormStatus> getAllForm() {
        return formStatusRepository.findAll();
    }

    // create new form status
    @PostMapping(path="/formstatus/add")
//    JSON format:
//    {
//        "formID": 1,
//        "workflowID": 1,
//        "userID": 123,
//        "evaluationStatus": "Approved",
//        "rejectionPersonnel": 1,
//        "rejectionComments": ""
//    }
    public ResponseEntity<?> addFormStatus(@RequestBody FormStatusMapping formStatusMapping) {
        System.out.println(formStatusMapping);
        FormStatus formStatus = new FormStatus();

        int formID = formStatusMapping.getFormID();
        Long workflowID = formStatusMapping.getWorkflowID();
        Long userID = formStatusMapping.getUserID();

        formStatus.setFormTemplate(formTemplateRepository.findById(formID).get());
        formStatus.setWorkflow(workflowRepository.findById(workflowID).get());
        formStatus.setUser(userRepository.findById(userID).get());

        formStatus.setEvaluationStatus(formStatusMapping.getEvaluationStatus());
        formStatus.setRejectionPersonnel(formStatusMapping.getRejectionPersonnel());
        formStatus.setRejectionComments(formStatusMapping.getRejectionComments());
        return ResponseEntity.ok(formStatusRepository.save(formStatus));
    }
}