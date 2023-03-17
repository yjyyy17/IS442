package com.is442.springbootbackend.controller;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Question;
import com.is442.springbootbackend.repository.FormTemplateRepository;
import com.is442.springbootbackend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private FormTemplateRepository formTemplateRepository;

    // get all questions
    @GetMapping(path = "/")
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // get questions by formTemplate id
    @GetMapping(path = "/{formID}")
    public List<Question> getQuestionsByID(@PathVariable int formID) {
        // returns null or a form template
        Optional<FormTemplate> form = formTemplateRepository.findById(formID);
        List<Question> allQuestions = getAllQuestions();
        List<Question> filteredQuestions = new ArrayList<>();

        for (Question q: allQuestions){
            System.out.println(q.getQuestionID());
            if (q.getFormID().getFormId() == formID){
                filteredQuestions.add(q);
            }
        }
//
        return filteredQuestions;
    }

    // create a new qn for an existing formtemp
    @PostMapping(path = "/add")
    //{
    //    "order": 1,
    //    "label": "label",
    //    "options": "option",
    //    "defaultQuestion": "hellow how are you?",
    //    "type": "type",
    //    "status": "active",
    //    "formID": {
    //  "formID" : 1
    //}}

    public ResponseEntity<?> addQuestions(@RequestBody Question question) throws NullPointerException{
        try {
            System.out.println(question.getFormID());
            if (formTemplateRepository.existsById(question.getFormID().getFormId())) {

                Question qn = new Question();
                qn.setOrder(question.getOrder());
                qn.setLabel(question.getLabel());
                qn.setOptions(question.getOptions());
                qn.setType(question.getType());
                qn.setStatus(question.getStatus());
                qn.setFormID(question.getFormID());

                questionRepository.save(qn);

                return new ResponseEntity<>(201,HttpStatus.OK);

            } else {
                System.out.println("Fail");
                return new ResponseEntity<>(500,HttpStatus.INTERNAL_SERVER_ERROR);}
        } catch (NullPointerException e) {
            throw new NullPointerException("No FormID");
        }
    }

    // delete question by questionid

    @PutMapping(path = "/delete/{questionID}/{status}")
    public ResponseEntity<?> deleteQuestionByID(@PathVariable int questionID, @PathVariable String status){
        Question qn = questionRepository.getById(questionID);
//        System.out.println(questionID);
//        System.out.println(status);
        qn.setStatus(status);
        questionRepository.save(qn);
        if (qn.getStatus() == status){

            return new ResponseEntity<>(201,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(500,HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    @PutMapping(path = "/edit")
    public ResponseEntity<?> editQuestionsByID(@RequestBody Question question){
        System.out.println(question.getQuestionID());
        boolean qnExists = questionRepository.existsById(question.getQuestionID());
        System.out.println(qnExists);
        if (qnExists){
            Question currentQn = questionRepository.getById(question.getQuestionID());
            currentQn.setStatus(question.getStatus());
            currentQn.setFormID(question.getFormID());
            currentQn.setOrder(question.getOrder());
            currentQn.setLabel(question.getLabel());
            currentQn.setOptions(question.getOptions());
            currentQn.setType(question.getType());
            currentQn.setStatus(question.getStatus());
            questionRepository.save(currentQn);
            return new ResponseEntity<>(204,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(400,HttpStatus.OK);

        }

    }

}
