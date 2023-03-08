package com.is442.springbootbackend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Approver")
public class Approver extends User{
}
