package com.is442.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.is442.springbootbackend.CompositeID.QuestionID;
import jakarta.persistence.*;

@Entity
@Table(name = "Questions")
//@IdClass(QuestionID.class)
public class Question {

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "form_id", referencedColumnName = "form_id")
//    @JsonBackReference
    @Column(name = "formID" , nullable = false)
    private int formID;
    @Id
    @Column(name = "questionID")
    private int questionID;
    @Column(name = "order")
    private int order;
    @Column(name = "label")
    private String label;
    @Column(name = "options")
    private String options;
    @Column(name = "defaultQuestion")
    private String defaultQuestion;
    @Column(name = "type")
    private String type;
    @Column(name = "status")
    private String status;

    public Question() {
    }

    public Question(int formID,
                    int questionID,
                    int order,
                    String label,
                    String options,
                    String defaultQuestion,
                    String type,
                    String status) {
        this.formID = formID;
        this.questionID = questionID;
        this.order = order;
        this.label = label;
        this.options = options;
        this.defaultQuestion = defaultQuestion;
        this.type = type;
        this.status = status;
    }

    public int getFormID() {
        return formID;
    }

    public void setFormID(int formID) {
        this.formID = formID;
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

    public String getDefaultQuestion() {
        return defaultQuestion;
    }

    public void setDefaultQuestion(String defaultQuestion) {
        this.defaultQuestion = defaultQuestion;
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
}
