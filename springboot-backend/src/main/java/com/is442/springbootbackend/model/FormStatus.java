package com.is442.springbootbackend.model;
import jakarta.persistence.*;
import java.util.*;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.is442.springbootbackend.model.FormTemplate;
//import com.is442.springbootbackend.model.FormStatusId;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.User;

@Entity

@Table(name = "form_status")
//@IdClass(FormStatusId.class)
public class FormStatus {
//    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "form_id", referencedColumnName = "form_id")
//    @MapsId
    private FormTemplate form;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
//    @MapsId
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "workflow_id", referencedColumnName = "workflow_id")
//    @MapsId
    private Workflow workflow;
    @Column(name = "evaluationStatus")
    private String evaluationStatus;

    @Column(name = "rejectionComments")
    private String rejectionComments;
    private long rejectionPersonnel;

    @Column(name = "due_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    // Constructors, getters and setters


    public FormStatus() {
    }

    public FormStatus(FormTemplate form, User user, Workflow workflow, String evaluationStatus, String rejectionComments, long rejectionPersonnel, Date dueDate) {
        this.form = form;
        this.user = user;
        this.workflow = workflow;
        this.evaluationStatus = evaluationStatus;
        this.rejectionComments = rejectionComments;
        this.rejectionPersonnel = rejectionPersonnel;
        this.dueDate = dueDate;
    }
    
    public String getEvaluationStatus() {
        return evaluationStatus;
    }

    public void setEvaluationStatus(String evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }

    public String getRejectionComments() {
        return rejectionComments;
    }

    public void setRejectionComments(String rejectionComments) {
        this.rejectionComments = rejectionComments;
    }

    public FormTemplate getForm() {
        return form;
    }

    public void setForm(FormTemplate form) {
        this.form = form;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public long getRejectionPersonnel() {
        return rejectionPersonnel;
    }

    public void setRejectionPersonnel(long rejectionPersonnel) {
        this.rejectionPersonnel = rejectionPersonnel;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FormStatus that = (FormStatus) o;
        return id == that.id && rejectionPersonnel == that.rejectionPersonnel && Objects.equals(form, that.form) && Objects.equals(user, that.user) && Objects.equals(workflow, that.workflow) && Objects.equals(evaluationStatus, that.evaluationStatus) && Objects.equals(rejectionComments, that.rejectionComments) && Objects.equals(dueDate, that.dueDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, form, user, workflow, evaluationStatus, rejectionComments, rejectionPersonnel, dueDate);
    }
}

