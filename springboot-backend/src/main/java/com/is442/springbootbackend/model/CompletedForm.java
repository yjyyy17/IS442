package com.is442.springbootbackend.model;
import jakarta.persistence.*;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.util.Arrays;

import com.fasterxml.jackson.core.io.doubleparser.FastDoubleParser;

@Entity
@Table(name = "completedForm")
public class CompletedForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userGroupId")
    private int userGroupId;
    
    @Column(name="pdfId", nullable=false)
    private int pdfId;

    @Lob
    @Column(name = "pdf_form")
    private byte[] pdfForm;


//    @OneToMany(mappedBy = "formTemplateQuestion")
//    private HashMap<int, FormTemplateQuestion> questions;

//    public int getUserGroupId() {
//        return userGroupId;
//    }
//    public int getPdfId() {
//        return pdfId;
//    }
   
    public byte[] getForm() throws Exception {
        return pdfForm;

    }

    public void setPdfForm(byte[] blob){
        try{

            
            // Create a new PDF entity
            // String currentDirectory = System.getProperty("user.dir");
            // System.out.println("Current working directory is: " + currentDirectory);

            File file = new File("springboot-backend/src/main/resources/test.pdf");

            // byte[] pdfBytes = Files.readAllBytes(file);
            FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }
            byte[] fileBytes = bos.toByteArray();
            fis.close();
            bos.close();
            System.out.println("file bytes" + fileBytes);
            this.pdfForm = fileBytes;


        }catch(Exception e){
            System.out.println(e);
        }
        
        // return pdfForm.toString();
    }

    public void setUserGroupId(int userGroupId) {
        this.userGroupId = userGroupId;
    }
    public void setPdfId(int pdfId) {
        this.pdfId = pdfId;
    }

    public void removeBlob(int userGroupId, int pdfId){
        this.pdfForm = null;
    }

    public CompletedForm() {
    }

    public CompletedForm(int userGroupId, int pdfId, byte[] pdfForm) {
        this.userGroupId = userGroupId;
        this.pdfId = pdfId;
        this.pdfForm = pdfForm;
    }


}
