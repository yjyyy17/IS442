package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import java.util.*;

import com.is442.springbootbackend.model.FormStatus;

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

    @JsonIgnore
    @ManyToMany(mappedBy = "assignedWorkflows")
    private Set<UserGroup> userGroups = new HashSet<>();
    @JsonIgnore
    @OneToMany(mappedBy = "workflow")
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

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        Workflow workflow = (Workflow) object;
        return java.util.Objects.equals(workflowId, workflow.workflowId) && java.util.Objects.equals(title, workflow.title) && java.util.Objects.equals(description, workflow.description) && java.util.Objects.equals(userGroups, workflow.userGroups);
    }

    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), workflowId, title, description, userGroups);
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Workflow{" +
                "workflowId=" + workflowId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
