package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.Approver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApproverRepository extends JpaRepository<Approver, Long> {
}
