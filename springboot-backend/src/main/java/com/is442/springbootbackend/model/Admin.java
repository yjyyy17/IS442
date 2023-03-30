package com.is442.springbootbackend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends User{
    public Admin() {
    }

    public Admin(String userType, String name, String email, String phoneNo, String password, String status) {
        super(userType, name, email, phoneNo, password, status);
    }
}
