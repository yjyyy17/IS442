package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.Question;
import com.is442.springbootbackend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    // get all questions
    @GetMapping(path = "/questions")
    public List<Question> getAllQuestions(){
        return questionRepository.findAll() ;
    }

    // get questions by formTemplate id
    @GetMapping(path = "/questions/{formID}")
    public Optional<Question> getQuestionsByID(@PathVariable int formID){
        return questionRepository.findById(formID);
    }

    // create a new qn for an existing formtemp
    @PostMapping(path = "/questions/add")
    public Question addQuestions(@RequestBody Question question){
        System.out.println("HELLO");
        System.out.println(question.getOrder());

        return new Question(question);

    }
}
