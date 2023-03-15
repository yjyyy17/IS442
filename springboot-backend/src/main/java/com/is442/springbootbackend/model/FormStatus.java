package com.is442.springbootbackend.model;
import jakarta.persistence.*;
import java.util.*;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.FormStatusId;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.User;

@Entity

@Table(name = "formstatus")
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

    // Constructors, getters and setters


    public FormStatus() {
    }

    public FormStatus(FormTemplate form, User user, Workflow workflow, String evaluationStatus, String rejectionComments, long rejectionPersonnel) {
        this.form = form;
        this.user = user;
        this.workflow = workflow;
        this.evaluationStatus = evaluationStatus;
        this.rejectionComments = rejectionComments;
        this.rejectionPersonnel = rejectionPersonnel;
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

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        FormStatus that = (FormStatus) object;
        return rejectionPersonnel == that.rejectionPersonnel && java.util.Objects.equals(form, that.form) && java.util.Objects.equals(user, that.user) && java.util.Objects.equals(workflow, that.workflow) && java.util.Objects.equals(evaluationStatus, that.evaluationStatus) && rejectionComments.equals(that.rejectionComments);
    }

    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), form, user, workflow, evaluationStatus, rejectionComments, rejectionPersonnel);
    }
}

