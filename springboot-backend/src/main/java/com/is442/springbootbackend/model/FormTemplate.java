package com.is442.springbootbackend.model;

import jakarta.persistence.*;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.is442.springbootbackend.model.FormStatus;
import com.is442.springbootbackend.model.Question;
//import com.is442.springbootbackend.model.Action;

@Entity
@Table(name = "form_template")
public class FormTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id", nullable = false, updatable = false)
    private int formId;

    @Column(nullable = false)
    private String title;

    @Column(name = "\"description\"")
    private String description;

    @Column(nullable = true)
    private String assignee;

    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date effectiveDate;

    @Column(nullable = false)
    private String formNumber;


    @JsonIgnore
    @OneToMany(mappedBy = "formTemplate")
    private Set<Action> actions = new HashSet<>();


    //this adds the form_id FK constraint to Question table
//    @JsonIgnore
    @OneToMany(mappedBy = "formID")
    private Collection<Question> questions;

    @Column(nullable = false)
    private Integer revisionNumber;


    @JsonIgnore
    @OneToMany(mappedBy = "form")
    private List<FormStatus> formStatuses = new ArrayList<>();


    public FormTemplate() {
        // default constructor
    }

    public FormTemplate(String title, String description, String assignee, Date effectiveDate, String formNumber, Integer revisionNumber) {
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.effectiveDate = effectiveDate;
        this.formNumber = formNumber;
        this.revisionNumber = revisionNumber;
    }


    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;

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

    public Integer getRevisionNumber() {
        return revisionNumber;
    }

    public void setRevisionNumber(Integer revisionNumber) {
        this.revisionNumber = revisionNumber;
    }


    public Collection<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<Question> questions) {
        this.questions = questions;
    }

    public List<FormStatus> getFormStatuses() {
        return formStatuses;
    }

    public void setFormStatuses(List<FormStatus> formStatuses) {
        this.formStatuses = formStatuses;
    }

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        FormTemplate that = (FormTemplate) object;
        return formId == that.formId && java.util.Objects.equals(title, that.title) && java.util.Objects.equals(description, that.description) && java.util.Objects.equals(assignee, that.assignee) && java.util.Objects.equals(effectiveDate, that.effectiveDate) && java.util.Objects.equals(formNumber, that.formNumber) && java.util.Objects.equals(revisionNumber, that.revisionNumber) && java.util.Objects.equals(formStatuses, that.formStatuses);
    }

    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), formId, title, description, assignee, effectiveDate, formNumber, revisionNumber, formStatuses);
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "FormTemplate{" +
                "formId=" + formId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", assignee='" + assignee + '\'' +
                ", effectiveDate=" + effectiveDate +
                ", formNumber='" + formNumber + '\'' +
                ", revisionNumber=" + revisionNumber +
                '}';
    }
}
