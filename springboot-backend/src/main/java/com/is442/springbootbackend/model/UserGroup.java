package com.is442.springbootbackend.model;
;
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

    @ManyToMany
    @JoinTable(name="user_group_users", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
    private Set<User> assignedUser = new HashSet<>();

    @ManyToMany
    @JoinTable(name="user_group_workflows", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="workflow_id"))
    private Set<Workflow> assignedWorkflow = new HashSet<>();

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

    public Set<Workflow> getAssignedWorkflow() {
        return assignedWorkflow;
    }

    public void setAssignedWorkflow(Set<Workflow> assignedWorkflow) {
        this.assignedWorkflow = assignedWorkflow;
    }
}
