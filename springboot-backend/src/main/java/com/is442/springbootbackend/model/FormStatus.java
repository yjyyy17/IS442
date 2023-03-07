package com.is442.springbootbackend.model;
import jakarta.persistence.*;
import java.util.*;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.User;
@Entity
@Table(name = "formstatus")
public class FormStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int fsID;
    @ManyToOne
    @JoinColumn(name = "form_id", referencedColumnName = "form_id")
    private FormTemplate formTemplate;
    @ManyToOne
    @JoinColumn(name = "workflow_id", referencedColumnName = "workflow_id")
    private Workflow workflow;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
    private String evaluationStatus;
    private int rejectionPersonnel;
    private String rejectionComments;

//    public FormStatus(FormTemplate formTemplate, Workflow workflow, User user, String evaluationStatus, int rejectionPersonnel, String rejectionComments){
//        this.formTemplate = formTemplate;
//        this.workflow = workflow;
//        this.user = user;
////        this.formStatusID = formStatusID;
//        this.evaluationStatus = evaluationStatus;
//        this.rejectionComments = rejectionComments;
//        this.rejectionPersonnel = rejectionPersonnel;
//    }

    public FormTemplate getFormTemplate() {
        return formTemplate;
    }

    public void setFormTemplate(FormTemplate formTemplate) {
        this.formTemplate = formTemplate;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEvaluationStatus() {
        return evaluationStatus;
    }

    public void setEvaluationStatus(String evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }

    public int getRejectionPersonnel() {
        return rejectionPersonnel;
    }

    public void setRejectionPersonnel(int rejectionPersonnel) {
        this.rejectionPersonnel = rejectionPersonnel;
    }

    public String getRejectionComments() {
        return rejectionComments;
    }

    public void setRejectionComments(String rejectionComments) {
        this.rejectionComments = rejectionComments;
    }
}
