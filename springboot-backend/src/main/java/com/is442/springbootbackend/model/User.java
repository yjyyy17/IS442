package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="roleId", referencedColumnName = "role_id")
    private Role role;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="email", nullable=false)
    private String email;

    @Column(name = "phone_no", nullable=false)
    private String phoneNo;

    @Column(name="password", nullable=false)
    private String password;

    @ManyToMany(mappedBy = "assignedUser")
    private Set<UserGroup> assignedUserGroup = new HashSet<>();

    public User(){
        super();
    }


    public User(Role role, String name, String email, String phoneNo, String password) {
        this.role = role;
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.password = password;
    }

    public Set<UserGroup> getAssignedUserGroup() {
        return assignedUserGroup;
    }

    public void setAssignedUserGroup(Set<UserGroup> assignedUserGroup) {
        this.assignedUserGroup = assignedUserGroup;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
