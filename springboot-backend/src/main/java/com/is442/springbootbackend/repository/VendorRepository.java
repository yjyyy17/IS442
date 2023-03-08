package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
}
