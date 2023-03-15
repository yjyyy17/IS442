package com.is442.springbootbackend.model;
import jakarta.persistence.*;
import java.util.*;
import java.io.Serializable;

import com.is442.springbootbackend.model.FormTemplate;
import com.is442.springbootbackend.model.Workflow;
import com.is442.springbootbackend.model.User;
@Embeddable
public class FormStatusId implements Serializable {

//    private static final long serialVersionUID = 1L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", referencedColumnName = "form_id", insertable = false, updatable = false)
//    @MapsId
    private FormTemplate form;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
//    @MapsId
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id", referencedColumnName = "workflow_id", insertable = false, updatable = false)
//    @MapsId
    private Workflow workflow;

    public FormStatusId() {}
    public FormStatusId(FormTemplate form, User user, Workflow workflow) {
        this.form = form;
        this.user = user;
        this.workflow = workflow;
    }

    public FormTemplate getForm() {
        return form;
    }

    public void setForm(FormTemplate form) {
        this.form = form;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        FormStatusId that = (FormStatusId) object;
        return java.util.Objects.equals(form, that.form) && java.util.Objects.equals(user, that.user) && java.util.Objects.equals(workflow, that.workflow);
    }

    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), form, user, workflow);
    }
}