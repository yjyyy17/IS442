package com.is442.springbootbackend.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.*;

import com.is442.springbootbackend.repository.FormTemplateRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import com.is442.springbootbackend.model.CompletedForm;
import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.repository.CompletedFormRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.Path;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CompletedFormController {
    @Autowired
    private CompletedFormRepository completedFormRepository;
    @Autowired
    private FormTemplateRepository formTemplateRepository;

    // get all form templates
    @GetMapping(path="/completedform")
    public List<CompletedForm> getAllForm() {
        return completedFormRepository.findAll();
    }



    // get completedForm by userGroupId and pdfId
    @PostMapping(path="/completedform")
    public CompletedForm findByUserGroupIdAndPdfId(@RequestParam int userGroupId,@RequestParam int pdfId) {
        return completedFormRepository.findByUserGroupIdAndPdfId(userGroupId,pdfId);
    }



     @PostMapping("/addCompletedForm")
    public CompletedForm createCompletedForm(@RequestParam int userGroupId,@RequestParam int pdfId,@RequestParam byte[] pdf_form){
        return completedFormRepository.save(new CompletedForm(userGroupId,pdfId,pdf_form));
    }

    //update completedForm by userGroupId and pdfId
    @PutMapping("/update")
    public CompletedForm updateUser(@RequestParam int userGroupId,@RequestParam int pdfId,@RequestParam byte[] pdf_form) {
        CompletedForm completedForm = completedFormRepository.findByUserGroupIdAndPdfId(userGroupId,pdfId);
        completedForm.setPdfId(pdfId);
        completedForm.setUserGroupId(userGroupId);
        completedForm.removeBlob(userGroupId,pdfId);
        completedForm.setPdfForm(pdf_form);

        return completedFormRepository.save(completedForm);
    }



    // @PersistenceContext
    // private EntityManager entityManager;
    // // create new form template
    // @PostMapping(path="/completedform/add")
    // public String addCompletedForm(@RequestParam int userGroupId,@RequestParam int pdfId)  {
    //     try {
    //         // Create a new PDF entity
    //         // String currentDirectory = System.getProperty("user.dir");
    //         // System.out.println("Current working directory is: " + currentDirectory);

    //         File file = new File("springboot-backend/src/main/resources/test.pdf");

    //         // byte[] pdfBytes = Files.readAllBytes(file);
    //         FileInputStream fis = new FileInputStream(file);
    //         ByteArrayOutputStream bos = new ByteArrayOutputStream();
    //         byte[] buffer = new byte[1024];
    //         int bytesRead;
    //         while ((bytesRead = fis.read(buffer)) != -1) {
    //             bos.write(buffer, 0, bytesRead);
    //         }
    //         byte[] fileBytes = bos.toByteArray();
    //         fis.close();
    //         bos.close();

    //         Blob pdfBlob = new javax.sql.rowset.serial.SerialBlob(fileBytes);

    //         CompletedForm completedForm = new CompletedForm();
    //         completedForm.setUserGroupId(userGroupId);
    //         completedForm.setPdfId(pdfId);
    //         // System.out.println("pdfBlob: " + pdfBlob);
    //         completedForm.setPdfForm(fileBytes);

    //         System.out.println(userGroupId);
    //         System.out.println(pdfId);
    //         System.out.println(fileBytes);



    //         // Persist the entity to the database
    //         entityManager.persist(fileBytes);


    //         // Close the EntityManager
    //         entityManager.close();


    //         // entityManager.persist(completedForm);

    //         // Return a success message
    //         return "Pdf added successfully!";

    //       } catch (Exception ex) {
    //         // Handle any exceptions that may occur
    //         return "Error adding pdf: " + ex.getMessage();
    //       }
    // }
   



}