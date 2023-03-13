package com.is442.springbootbackend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends User{
    public Admin() {
    }

    public Admin(String name, String email, String phoneNo, String password) {
        super(name, email, phoneNo, password);
    }
}
