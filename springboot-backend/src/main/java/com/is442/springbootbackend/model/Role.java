package com.is442.springbootbackend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private long roleId;

    @OneToMany(targetEntity = User.class , mappedBy = "userId",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> userList;

    @Column(name = "role", nullable = false)
    private String role;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "industry", nullable = false)
    private String industry;

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
