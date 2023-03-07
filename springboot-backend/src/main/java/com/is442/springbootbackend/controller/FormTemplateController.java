package com.is442.springbootbackend.controller;

import java.util.*;
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

    // get all form templates
    @GetMapping(path="/formtemplate")
    public List<FormTemplate> getAllForm() {
        return formTemplateRepository.findAll();
    }

    // get form template by formID
    @GetMapping(path="/formtemplate/{formID}")
    public FormTemplate getFormByID(@PathVariable int formID) {
        return formTemplateRepository.findById(formID).orElse(null);
    }

    // create new form template
    @PostMapping(path="/formtemplate/add")
//    JSON format:
//    {
//        "assignee": "Amy",
//        "description": "form1",
//        "effectiveDate": "2023-03-04",
//        "formNumber": "abc-123-xyz",
//        "revisionNumber": 1,
//        "title": "Vendor Assessment Form"
//    }
    public ResponseEntity<?> addForm(@RequestBody FormTemplate form) {
        return ResponseEntity.ok(formTemplateRepository.save(form));
    }

    // update form template by formID
    @PutMapping(path="/formtemplate/{formID}")
    public ResponseEntity<FormTemplate> updateForm(@PathVariable int formID,@RequestBody FormTemplate form) throws Exception{
        FormTemplate updateForm = formTemplateRepository.findById(formID)
                .orElseThrow(() -> new Exception("Form template not exist with id: " + formID));

        updateForm.setTitle(form.getTitle());
        updateForm.setDescription(form.getDescription());
        updateForm.setAssignee(form.getAssignee());
        updateForm.setEffectiveDate(form.getEffectiveDate());
        updateForm.setFormNumber(form.getFormNumber());
        updateForm.setRevisionNumber(form.getRevisionNumber());

        formTemplateRepository.save(updateForm);

        return ResponseEntity.ok(updateForm);
    }

}