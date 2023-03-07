package com.is442.springbootbackend.model;

public class FormStatusMapping{
    private int formID;
    private Long workflowID;
    private Long userID;

    private String evaluationStatus;
    private int rejectionPersonnel;
    private String rejectionComments;

    public int getFormID() {
        return formID;
    }

    public void setFormID(int formID) {
        this.formID = formID;
    }

    public Long getWorkflowID() {
        return workflowID;
    }

    public void setWorkflowID(Long workflowID) {
        this.workflowID = workflowID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getEvaluationStatus() {
        return evaluationStatus;
    }

    public void setEvaluationStatus(String evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }

    public int getRejectionPersonnel() {
        return rejectionPersonnel;
    }

    public void setRejectionPersonnel(int rejectionPersonnel) {
        this.rejectionPersonnel = rejectionPersonnel;
    }

    public String getRejectionComments() {
        return rejectionComments;
    }

    public void setRejectionComments(String rejectionComments) {
        this.rejectionComments = rejectionComments;
    }
}