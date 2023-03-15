package com.is442.springbootbackend.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.is442.springbootbackend.model.CompletedForm;


@Repository
public interface CompletedFormRepository extends JpaRepository<CompletedForm, Integer>{

    public CompletedForm findByUserGroupIdAndPdfId(int userGroupId,int pdfId);


}