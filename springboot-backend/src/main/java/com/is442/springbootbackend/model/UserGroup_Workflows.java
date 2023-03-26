package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.*;

import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.UserGroup;

@Entity
@Table(name="workflow_duedate")
public class UserGroup_Workflows {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_workflow_id")
    private Long usergroupWorkflowId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_group_id", referencedColumnName = "user_group_id")
    @JsonIgnoreProperties("assignedWorkflows")
    private UserGroup usergroup;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "workflow_id", referencedColumnName = "workflow_id")
    private Workflow workflow;


    @Column(name = "due_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    public UserGroup_Workflows(){}

    public UserGroup_Workflows(Workflow workflow, UserGroup usergroup, Date dueDate) {
        this.workflow = workflow;
        this.usergroup = usergroup;
        this.dueDate = dueDate;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    @JsonIgnoreProperties("assignedWorkflows")
    public UserGroup getUserGroup() {
        return usergroup;
    }

    public void setUserGroupId(UserGroup usergroup) {
        this.usergroup = usergroup;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}
