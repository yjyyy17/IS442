package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name = "user_group")
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_id")
    private Long userGroupId;

    @JsonBackReference
    @ManyToMany
    @JoinTable(name="user_group_users", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
    private Set<User> assignedUser = new HashSet<>();


    @ManyToOne()
    @JoinColumn(name="workflowId", referencedColumnName = "workflow_id")
    private Workflow workflow;

    public UserGroup(){
        super();
    }

    public Long getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Long userGroupId) {
        this.userGroupId = userGroupId;
    }

    public Set<User> getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(Set<User> assignedUser) {
        this.assignedUser = assignedUser;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }
}
