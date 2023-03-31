package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import java.util.*;


@Entity
@Table(name="workflow")
public class Workflow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workflow_id")
    private Long workflowId;

    @Column(name = "title", nullable=false)
    private String title;

    @Column(name = "description", nullable=false)
    private String description;

    @Column(name = "status", nullable = false)
    private String status;


//    @JsonIgnore
    @ManyToMany(mappedBy = "assignedWorkflows")
    @JsonIgnoreProperties("assignedWorkflows")
    private Set<UserGroup> userGroups = new HashSet<>();
//    @JsonIgnore
    @OneToMany(mappedBy = "workflow")
    @JsonIgnoreProperties("workflow")
    private List<FormStatus> formStatuses = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "workflow")
    private Set<Action> actions = new HashSet<>();


    public Workflow(){
        super();
    }


    public Workflow(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Long getWorkflowId() {
        return workflowId;
    }

    public void setWorkflowId(Long workflowId) {
        this.workflowId = workflowId;
    }

    public Set<UserGroup> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<UserGroup> userGroups) {
        this.userGroups = userGroups;
    }

    public Set<Action> getActions() {
        return actions;
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


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<FormStatus> getFormStatuses() {
        return formStatuses;
    }

    public void setFormStatuses(List<FormStatus> formStatuses) {
        this.formStatuses = formStatuses;
    }
}
