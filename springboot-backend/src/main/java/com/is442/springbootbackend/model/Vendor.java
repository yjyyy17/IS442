package com.is442.springbootbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("Vendor")
public class Vendor extends User {

    @Column(name="address")
    private String address;
    @Column(name="industry")
    private String industry;

    public Vendor() {
    }

    public Vendor(String userType, String name, String email, String phoneNo, String password, String address, String industry) {
        super(userType, name, email, phoneNo, password);
        this.address = address;
        this.industry = industry;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public String getIndustry() {
        return industry;
    }
}
