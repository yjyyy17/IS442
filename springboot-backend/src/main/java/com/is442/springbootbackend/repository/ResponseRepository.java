package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Response;
import com.is442.springbootbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Integer> {
    @Transactional
    @Modifying
    @Query("update Response r set r.answer = ?1 where r.responseID = ?2")
    int updateResponsee(String answer, int responseID);
    @Transactional
    @Modifying
    @Query("update Response r set r.answer = ?1")
    int updateResponse(String answer);

//    public Optional<Response> findByUserID (long userID);
}
