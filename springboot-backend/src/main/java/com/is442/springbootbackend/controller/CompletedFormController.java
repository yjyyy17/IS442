package com.is442.springbootbackend.controller;

import java.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import com.is442.springbootbackend.model.CompletedForm;

import com.is442.springbootbackend.repository.CompletedFormRepository;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CompletedFormController {
    @Autowired
    private CompletedFormRepository completedFormRepository;

    // get all form templates
    @GetMapping(path="/completedform")
    public List<CompletedForm> getAllForm() {
        return completedFormRepository.findAll();
    }

    // // get completedForm by user_group_id and pdf_id
    // @GetMapping(path="/completedform/{user_group_id}/{pdf_id}")
    // public CompletedForm findByUserGroupIdAndPdfId(@PathVariable int userGroupId, int pdfId) {
    //     return completedFormRepository.findByUserGroupIdAndPdfId(userGroupId,pdfId);
    // }

    @GetMapping(path="/completedform/{user_group_id}/{pdf_id}")
    @ResponseBody
    public CompletedForm getFormByUserGroupIdAndPdfId(@PathVariable Map<Integer, Integer> pathVarsMap) {
        Integer user_group_id = pathVarsMap.get("user_group_id");
        Integer pdf_id = pathVarsMap.get("pdf_id");
        if (user_group_id != null && pdf_id != null) {
            return completedFormRepository.findByUserGroupIdAndPdfId(user_group_id,pdf_id);
        // } else {
        //     return "Missing Parameters";
        }
        return null;
    }


//     // create new form template
//     @PostMapping(path="/completedform/add")
// //    JSON format:
// //    {
// //        "assignee": "Amy",
// //        "description": "form1",
// //        "effectiveDate": "2023-03-04",
// //        "formNumber": "abc-123-xyz",
// //        "revisionNumber": 1,
// //        "title": "Vendor Assessment Form"
// //    }
//     public ResponseEntity<?> addForm(@RequestBody FormTemplate form) {
//         return ResponseEntity.ok(completedFormRepository.save(form));
//     }

//     // update form template by formID
//     @PutMapping(path="/formtemplate/{formID}")
//     public ResponseEntity<FormTemplate> updateForm(@PathVariable int formID,@RequestBody FormTemplate form) throws Exception{
//         FormTemplate updateForm = formTemplateRepository.findById(formID)
//                 .orElseThrow(() -> new Exception("Form template not exist with id: " + formID));

//         updateForm.setTitle(form.getTitle());
//         updateForm.setDescription(form.getDescription());
//         updateForm.setAssignee(form.getAssignee());
//         updateForm.setEffectiveDate(form.getEffectiveDate());
//         updateForm.setFormNumber(form.getFormNumber());
//         updateForm.setRevisionNumber(form.getRevisionNumber());

//         formTemplateRepository.save(updateForm);

//         return ResponseEntity.ok(updateForm);
//     }

}