package com.is442.springbootbackend.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.is442.springbootbackend.model.FormStatus;


@Repository
public interface FormStatusRepository extends JpaRepository<FormStatus, Integer>{
}