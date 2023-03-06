package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private long roleId;
    @JsonIgnore
    @OneToMany(targetEntity = User.class , mappedBy = "userId",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<User> userList = new HashSet<>();

    @Column(name = "role", nullable = false)
    private String role;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "industry", nullable = false)
    private String industry;

    public Role(){
        super();
    }

    public Role(String role, String address, String industry) {
        this.role = role;
        this.address = address;
        this.industry = industry;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public Set<User> getUserList() {
        return userList;
    }

    public void setUserList(Set<User> userList) {
        this.userList = userList;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }
}
