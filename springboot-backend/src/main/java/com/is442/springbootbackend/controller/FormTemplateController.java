package com.is442.springbootbackend.controller;

import java.util.*;

import com.is442.springbootbackend.exception.ResourceNotFoundException;
import com.is442.springbootbackend.model.User;
import com.is442.springbootbackend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import com.is442.springbootbackend.model.FormTemplate;

import com.is442.springbootbackend.repository.FormTemplateRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FormTemplateController {
    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private UserRepository userRepository;

    // get all form templates
    @GetMapping(path = "/formtemplate")
    public List<FormTemplate> getAllForm() {
        return formTemplateRepository.findAll();
    }

    // get form template by formID
    @GetMapping(path = "/formtemplate/{formId}")
    public ResponseEntity<?> getFormByID(@PathVariable int formId) {
        FormTemplate formTemplate = formTemplateRepository.findById(formId).orElse(null);
        if(formTemplate!=null){
            return ResponseEntity.ok(formTemplate);
        }
        else{
            return ResponseEntity.badRequest().body("Form template not exist with id: " + formId);
        }
    }

    // create new form template
//    JSON format:
//    {
//        "assignee": {
//          "userId": 6
//         },
//        "description": "form1",
//        "effectiveDate": "2023-03-04",
//        "formNumber": "abc-123-xyz",
//        "revisionNumber": 1,
//        "title": "Vendor Assessment Form"
//    }
    @PostMapping(path = "/formtemplate/add")
    public ResponseEntity<?> addForm(@RequestBody FormTemplate form) {
        System.out.println(form.getAssignee().getUserId());
        long userId = form.getAssignee().getUserId();
        User user = (User) userRepository.findById(userId).orElse(null);
        if (user != null) {
            form.setAssignee(user);
        } else {
            return ResponseEntity.badRequest().body("Assignee with ID " + userId + " does not exist.");
        }
        return ResponseEntity.ok(formTemplateRepository.save(form));
    }

    // update form template by formID
    @PutMapping(path = "/formtemplate/{formId}")
    public ResponseEntity<?> updateForm(@PathVariable int formId, @RequestBody FormTemplate form) throws Exception {
        FormTemplate updateForm = formTemplateRepository.findById(formId)
                .orElseThrow(() -> new Exception("Form template not exist with id: " + formId));

        updateForm.setTitle(form.getTitle());
        updateForm.setDescription(form.getDescription());

        long userId = form.getAssignee().getUserId();
        User user = (User) userRepository.findById(userId).orElse(null);
        if (user != null) {
            updateForm.setAssignee(user);
        } else {
            return ResponseEntity.badRequest().body("Assignee with ID " + userId + " does not exist.");
        }

        updateForm.setEffectiveDate(form.getEffectiveDate());
        updateForm.setFormNumber(form.getFormNumber());
        updateForm.setRevisionNumber(form.getRevisionNumber());

        formTemplateRepository.save(updateForm);

        return ResponseEntity.ok(updateForm);
    }

    // Delete a form template record
    @DeleteMapping("/formtemplate/{formId}")
    public ResponseEntity<String> deleteFormTemplate(
            @PathVariable int formId) {

        FormTemplate formTemplate = formTemplateRepository.findById(formId).orElse(null);
        if(formTemplate!=null){
            formTemplateRepository.delete(formTemplate);
            return ResponseEntity.ok().body("Successfully deleted.");
        }
        else{
            return ResponseEntity.badRequest().body("Error deleting form template.");
        }


    }

    //soft delete formTemplate by formTempId

    @PutMapping("/formtemplate/delete/{id}")
    public ResponseEntity<?> softDeleteFormTemplate(@PathVariable int id){
        FormTemplate formTemplate = formTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id : " + id));

        formTemplate.setStatus("Inactive");
        formTemplateRepository.save(formTemplate);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Status", Boolean.TRUE );
        return ResponseEntity.ok(response);
    }

}