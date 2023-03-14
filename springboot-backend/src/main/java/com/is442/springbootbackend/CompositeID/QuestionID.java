package com.is442.springbootbackend.CompositeID;

import com.is442.springbootbackend.model.FormTemplate;

import java.io.Serializable;
import java.util.Objects;

public class QuestionID implements Serializable {

    private int formID;
    private int questionID;

    public QuestionID(int formID, int questionID) {
        this.formID = formID;
        this.questionID = questionID;
    }

    public QuestionID() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionID that = (QuestionID) o;
        return formID == that.formID && questionID == that.questionID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(formID, questionID);
    }
}
