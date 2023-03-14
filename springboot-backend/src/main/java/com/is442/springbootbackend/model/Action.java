package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="action")

public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long actionId;
    @Column(name = "title")
    private String title;

    @Column(name = "assignee_role")
    private String assigneeRole;

    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private Workflow workflow;

    @ManyToOne
    @JoinColumn(name ="form_id")
    private FormTemplate formTemplate;

    public Action(){
        super();
    }

    public Action(String title, String assigneeRole) {
        this.title = title;
        this.assigneeRole = assigneeRole;
    }

    public long getActionId() {
        return actionId;
    }

    public void setActionId(long actionId) {
        this.actionId = actionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAssigneeRole() {
        return assigneeRole;
    }

    public void setAssigneeRole(String assigneeRole) {
        this.assigneeRole = assigneeRole;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public FormTemplate getFormTemplate() {
        return formTemplate;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public void setFormTemplate(FormTemplate formTemplate) {
        this.formTemplate = formTemplate;
    }
}
