package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.is442.springbootbackend.CompositeID.QuestionID;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.*;

import java.io.File;

@Entity
@Table(name = "Question")
//@IdClass(QuestionID.class)
public class Question {

    //    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "form_id", referencedColumnName = "form_id")
//    @JsonBackReference
//    @Column(name = "formID" , nullable = false)
//    private int formID;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionID")
    private int questionID;

    private File test;

    @Column(name = "order", nullable = false)
    private int order;
    @Column(name = "label", nullable = false)
    private String label;
    @Column(name = "options", nullable = true)
    private String options;
    @Column(name = "type", nullable = false)
    private String type;
    @Column(name = "status", nullable = false)
    private String status;
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "form_id", referencedColumnName = "form_id")
    private FormTemplate formID;

    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private Set<Response> response;



    public Question() {
    }

    public Question(int questionID,
                    int order,
                    String label,
                    String options,
                    String type,
                    String status,
                    FormTemplate formID) {
        this.questionID = questionID;
        this.order = order;
        this.label = label;
        this.options = options;
        this.type = type;
        this.status = status;
        this.formID = formID;
    }

    public Question(Question question) {

    }

    public int getQuestionID() {
        return questionID;
    }

    public void setQuestionID(int questionID) {
        this.questionID = questionID;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public FormTemplate getFormID() {
        return formID;
    }

    public int getFormIdInt(){return getFormID().getFormId();}

    public void setFormID(FormTemplate formID) {
        this.formID = formID;
    }

    public Set<Response> getResponse() {
        return response;
    }

    public void setResponse(Set<Response> response) {
        this.response = response;
    }


}


