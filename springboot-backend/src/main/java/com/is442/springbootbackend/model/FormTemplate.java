package com.is442.springbootbackend.model;
import jakarta.persistence.*;
import java.util.*;
@Entity
@Table(name = "formTemplate")
public class FormTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id")
    private int formID;
    @Column(name="title", nullable=false)
    private String title;
    @Column(name="description", nullable=false)
    private String description;
    @Column(name="assignee", nullable=false)
    private String assignee;
    @Column(name="effectiveDate", nullable=false)
    private Date effectiveDate;
    @Column(name="form_number", nullable=false)
    private String formNumber;
    @Column(name="revision_number", nullable=false)
    private int revisionNumber;

//    @OneToMany(mappedBy = "formTemplateQuestion")
//    private HashMap<int, FormTemplateQuestion> questions;

    public int getFormID() {
        return formID;
    }

    public void setFormID(int formID) {
        this.formID = formID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public Date getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public String getFormNumber() {
        return formNumber;
    }

    public void setFormNumber(String formNumber) {
        this.formNumber = formNumber;
    }

    public int getRevisionNumber() {
        return revisionNumber;
    }

    public void setRevisionNumber(int revisionNumber) {
        this.revisionNumber = revisionNumber;
    }

//    public HashMap<int, FormTemplateQuestion> getQuestions() {
//        return questions;
//    }
//
//    public void setQuestions(HashMap<int, FormTemplateQuestion> questions) {
//        this.questions = questions;
//    }
}
