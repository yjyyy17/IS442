package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.jdbc.Work;

import java.util.List;
import java.util.Set;
@Entity
@Table(name = "user_group")
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_id")
    private Long userGroupId;
    @JsonIgnore
    @ManyToMany
    @JoinTable(name="user_group_users", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
    private List<User> assignedUser;
    @JsonIgnore
    @ManyToMany
    @JoinTable(name="user_group_workflows", joinColumns = @JoinColumn(name="user_group_id"), inverseJoinColumns = @JoinColumn(name="workflow_id"))
    private List<Workflow> assignedWorkflow;

    public UserGroup(){
        super();
    }


    public Long getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Long userGroupId) {
        this.userGroupId = userGroupId;
    }


}
