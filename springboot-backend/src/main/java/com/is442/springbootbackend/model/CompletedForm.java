package com.is442.springbootbackend.model;
import jakarta.persistence.*;
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
 
//    @OneToMany(mappedBy = "formTemplateQuestion")
//    private HashMap<int, FormTemplateQuestion> questions;

    public int getUserGroupId() {
        return userGroupId;
    }
    public int getPdfId() {
        return pdfId;
    }
   

}
