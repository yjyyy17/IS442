import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
} from "../../../mui";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import DynamicForm from "./DynamicForm";
import getFormQuestions from '../../../services/getFormQuestions';

const Item = styled(Box)(() => ({
  padding: 1,
}));

const MuiCard = styled(Card)(() => ({
  padding: 30,
  marginTop: 20,
}));

const IndividualWorkflow = () => {
  // Get workflow data from location state
  // Comes from ViewWorkflows.js
  const location = useLocation();
  const workflowData = location.state ? location.state.data : [];
  console.log(workflowData)

  // Initialising form data and question data state variables
  const formData = workflowData.form;
  const formID = formData.formId;

  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormQuestions(formID.toString());
      setQuestionData(data);
    };

    fetchData();
  }, [formID])

  const handleSubmit = (answerData) => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
const inputString = "2023-03-01T22:58";
console.log(dateTimeRegex.test(inputString)); // true

    answerData.forEach((item) => {
      if (typeof item.answer !== "string") {
        let answer = ""
        if (item.answer.options.length > 0) {
          answer = item.answer.options.join(",");
          if (item.answer.input.length > 0) {
            answer += "," + item.answer.input;
          }
        } else if (item.answer.input.length > 0) {
          answer = item.answer.input;
        }
        item.answer = answer
      } else if (dateTimeRegex.test(item.answer)) {
        item.answer = item.answer.slice(0,10)
      }
    });
    console.log(answerData);
  };
  return (
    <>
      <Typography variant='h5' sx={{ pb: 4 }}>
        {workflowData.workflow.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Item sx={{ color: "grey" }}>
            {workflowData.workflow.description}
            <br></br>
            <br></br>
            Please fill out all the fields before submitting
            <MuiCard sx={{ color: "grey" }}>
              <Typography variant='h6'>Form details</Typography>
              <Typography>Form Title: {formData.title}</Typography>
              <Typography>Form No: {formData.form_no}</Typography>
              <Typography>Effective Date: {formData.effective_date}</Typography>
              <br></br>
              <Typography>Status: {workflowData.status}</Typography>
            </MuiCard>
          </Item>
        </Grid>

        <Grid item xs={12} md={8}>
          <Item>
            <Card sx={{ p: 4 }}>
              <Typography variant='h6'>{formData.title}</Typography>
              <DynamicForm
                questions={questionData}
                onSubmit = {handleSubmit}
              />
            </Card>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default IndividualWorkflow;
