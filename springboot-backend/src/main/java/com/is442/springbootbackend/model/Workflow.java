package com.is442.springbootbackend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(mappedBy = "assignedWorkflow")
    private Set<UserGroup> assignedUserGroup = new HashSet<>();

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
}
