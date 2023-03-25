package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.*;

import com.is442.springbootbackend.model.UserGroup_Workflows;
@Entity
@Table(name = "user_group")
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_id")
    private Long userGroupId;

    @ManyToMany
    @JoinTable(name="user_group_users", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
    private Set<User> assignedUsers = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "usergroupWorkflowId")
    private List<UserGroup_Workflows> assignedWorkflows = new ArrayList<>();

//    @ManyToMany
//    @JoinTable(name="user_group_workflows", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="workflow_id"))
//    private Set<Workflow> assignedWorkflows = new HashSet<>();


    public UserGroup(){
        super();
    }

    public Long getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Long userGroupId) {
        this.userGroupId = userGroupId;
    }

    public Set<User> getAssignedUsers() {
        return assignedUsers;
    }

    public List<UserGroup_Workflows> getAssignedWorkflows() {
        return assignedWorkflows;
    }

    public void assignUser(User user) {
        assignedUsers.add(user);
    }

    public void assignWorkflow(List<UserGroup_Workflows> assignedWorkflows) {
        this.assignedWorkflows = assignedWorkflows;
    }

//    public Date getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(Date dueDate) {
//        this.dueDate = dueDate;
//    }
}
