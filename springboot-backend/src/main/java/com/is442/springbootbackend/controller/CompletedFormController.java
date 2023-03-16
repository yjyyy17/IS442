package com.is442.springbootbackend.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.*;
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

    // get all form templates
    @GetMapping(path="/completedform")
    public List<CompletedForm> getAllForm() {
        return completedFormRepository.findAll();
    }



    // get completedForm by user_group_id and pdf_id
    @PostMapping(path="/completedform")
    public CompletedForm findByUserGroupIdAndPdfId(@RequestParam int user_group_id,@RequestParam int pdf_id) {
        return completedFormRepository.findByUserGroupIdAndPdfId(user_group_id,pdf_id);
    }

    // @PostMapping(path="/addCompletedForm")
    // public ResponseEntity<?> uploadFile(@RequestParam("file")MultipartFile file) throws IOException{
    //     String uploadImage = service.uploadImage(file);
    //     return ResponseEntity.status(HttpStatusCode.OK).body(uploadImage);
    // }


     @PostMapping("/addCompletedForm")
    public CompletedForm createCompletedForm(@RequestParam int user_group_id,@RequestParam int pdf_id,@RequestParam byte[] pdf_form){
        return completedFormRepository.save(new CompletedForm(user_group_id,pdf_id,pdf_form));
    }



    // @PersistenceContext
    // private EntityManager entityManager;
    // // create new form template
    // @PostMapping(path="/completedform/add")
    // public String addCompletedForm(@RequestParam int user_group_id,@RequestParam int pdf_id)  {
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
    //         completedForm.setUserGroupId(user_group_id);
    //         completedForm.setPdfId(pdf_id);
    //         // System.out.println("pdfBlob: " + pdfBlob);
    //         completedForm.setPdfForm(fileBytes);

    //         System.out.println(user_group_id);
    //         System.out.println(pdf_id);
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