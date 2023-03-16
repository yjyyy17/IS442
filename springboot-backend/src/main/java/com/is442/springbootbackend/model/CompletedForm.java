package com.is442.springbootbackend.model;
import jakarta.persistence.*;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

import com.fasterxml.jackson.core.io.doubleparser.FastDoubleParser;

@Entity
@Table(name = "completedForm")
public class CompletedForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_id")
    private int userGroupId;
    
    @Column(name="pdf_id", nullable=false)
    private int pdfId;

    @Lob
    // @Column(name="pdf_form", nullable=true)
    private byte[] pdfForm;
 
//    @OneToMany(mappedBy = "formTemplateQuestion")
//    private HashMap<int, FormTemplateQuestion> questions;

    public int getUserGroupId() {
        return userGroupId;
    }
    public int getPdfId() {
        return pdfId;
    }
   
    public String getForm() throws Exception {
        // Retrieve the byte array from the BLOB object
        byte[] blobBytes;
        // blobBytes = pdfForm.getBytes(1, (int) pdfForm.length());
        blobBytes = pdfForm;
      

        // Create an input stream from the byte array
        InputStream inputStream = new ByteArrayInputStream(blobBytes);

        // Now you can use the input stream to read the contents of the BLOB object
        // For example, you could read the contents into a file like this:
        FileOutputStream outputStream = new FileOutputStream("myFile.pdf");
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.close();
        return pdfForm.toString();

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
