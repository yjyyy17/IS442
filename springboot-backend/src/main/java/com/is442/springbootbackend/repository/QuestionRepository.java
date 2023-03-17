package com.is442.springbootbackend.repository;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    public Optional<Question> findQuestionByFormID (Optional<FormTemplate> formId);
}
