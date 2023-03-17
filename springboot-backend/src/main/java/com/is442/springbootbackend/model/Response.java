package com.is442.springbootbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Response")
public class Response{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "responseID")
    private int responseID;

    @Column(name = "answer", nullable = true)
    private String answer;

    @Column(name = "status", nullable = false)
    private String status;

    @OneToOne
    @JoinColumns({ @JoinColumn( referencedColumnName = "questionID", name = "questionID"),
    @JoinColumn(name = "formID", referencedColumnName = "form_id")})
    private Question question;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "user_id")
    private User userID;


    public Response() {
    }

    public Response(int responseID,
                    String answer,
                    String status,
                    Question question,
                    User userID) {
        this.responseID = responseID;
        this.answer = answer;
        this.status = status;
        this.question = question;
        this.userID = userID;
    }

    public int getResponseID() {
        return responseID;
    }

    public void setResponseID(int responseID) {
        this.responseID = responseID;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }


}
