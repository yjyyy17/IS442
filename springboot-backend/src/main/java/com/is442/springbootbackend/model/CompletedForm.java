package com.is442.springbootbackend.model;
import jakarta.persistence.*;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

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
    @Column(name="pdf_form", nullable=false)
    private Blob pdfForm;
 
//    @OneToMany(mappedBy = "formTemplateQuestion")
//    private HashMap<int, FormTemplateQuestion> questions;

    public int getUserGroupId() {
        return userGroupId;
    }
    public int getPdfId() {
        return pdfId;
    }
   
    public String getForm() throws IOException {
        // Retrieve the byte array from the BLOB object
        byte[] blobBytes;
        try {
            blobBytes = pdfForm.getBytes(1, (int) pdfForm.length());
       

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


        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return pdfForm.toString();

    }

    public void setPdfForm(Blob blob){
        this.pdfForm = blob;
        // return pdfForm.toString();
    }

    public void setUserGroupId(int userGroupId) {
        this.userGroupId = userGroupId;
    }
    public void setPdfId(int pdfId) {
        this.pdfId = pdfId;
    }

}
