package com.is442.springbootbackend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonIgnore
    @OneToMany(mappedBy = "formTemplate")
    private Set<Action> actions = new HashSet<>();



    //this adds the form_id FK constraint to Question table
//    @JsonIgnore
    @OneToMany(mappedBy = "formID")
    private Collection<Question> questions;

    public FormTemplate() {
    }

    public FormTemplate(int formID,
                        String title,
                        String description,
                        String assignee,
                        Date effectiveDate,
                        String formNumber,
                        int revisionNumber,
                        Collection<Question> questions) {
        this.formID = formID;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.effectiveDate = effectiveDate;
        this.formNumber = formNumber;
        this.revisionNumber = revisionNumber;
        this.questions = questions;
    }

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

    public Collection<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<Question> questions) {
        this.questions = questions;
    }
}
