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


    public User(String name, String email, String phoneNo, String password) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.password = password;
    }

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

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        User user = (User) object;
        return userId == user.userId && java.util.Objects.equals(name, user.name) && java.util.Objects.equals(email, user.email) && java.util.Objects.equals(phoneNo, user.phoneNo) && java.util.Objects.equals(password, user.password) && java.util.Objects.equals(userGroups, user.userGroups);
    }

    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), userId, name, email, phoneNo, password, userGroups);
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public Collection<Response> getResponse() {
        return response;
    }

    public void setResponse(Collection<Response> response) {
        this.response = response;
    }
}
