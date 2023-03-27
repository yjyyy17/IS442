package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import java.util.*;

import com.is442.springbootbackend.model.FormStatus;

@Entity
@Table(name="user")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type", discriminatorType = DiscriminatorType.STRING)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="email", nullable=false)
    private String email;

    @Column(name = "phone_no", nullable=false)
    private String phoneNo;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="user_type",insertable = false, updatable = false)
    private String userType;


    @Column(name = "status", nullable = false)
    private String status;

    @JsonIgnore
    @ManyToMany(mappedBy = "assignedUsers")
    private Set<UserGroup> userGroups = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<FormStatus> formStatuses = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "userID", cascade = CascadeType.REMOVE)
    private Collection<Response> response;

    public User(){
        super();
    }


    public User(String name, String email, String phoneNo, String password, String userType) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.password = password;
        this.userType = userType;
    }

//    public User(String name, String email, String phoneNo, String password) {
//        this.name = name;
//        this.email = email;
//        this.phoneNo = phoneNo;
//        this.password = password;
//    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Set<UserGroup> getUserGroups() {
        return userGroups;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId == user.userId && Objects.equals(name, user.name) && Objects.equals(email, user.email) && Objects.equals(phoneNo, user.phoneNo) && Objects.equals(password, user.password) && Objects.equals(userType, user.userType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, name, email, phoneNo, password, userType);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", password='" + password + '\'' +
                ", userType='" + userType + '\'' +
                '}';
    }

    public Collection<Response> getResponse() {
        return response;
    }

    public void setResponse(Collection<Response> response) {
        this.response = response;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

