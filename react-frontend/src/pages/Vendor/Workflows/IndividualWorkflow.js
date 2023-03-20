import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
} from "../../../mui";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import DynamicForm from "./DynamicForm";

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

  // Initialising form data and question data state variables
  const [formData, setFormData] = useState({
    form_id: 0,
    title: "New Vendor Assessment Form",
    description: "",
    assignee: "",
    effective_date: "24/05/2022",
    form_no: "123",
    revision_no: 1,
  });

  const [questionData, setQuestionData] = useState([
    {
      form_id: 0,
      question_id: 0,
      order: 1,
      label: "Company's name",
      options: "NA",
      type: "Text Input",
      status: "Active",
    },
    {
      form_id: 0,
      question_id: 1,
      order: 3,
      label: "GST Registered",
      options: "Yes,No,Others",
      type: "Radio",
      status: "Active",
    },
    {
      form_id: 0,
      question_id: 2,
      order: 4,
      label: "Type of Business License/ Registration",
      options:
        "Sole proprietorship,Limited Company,Partnership Agreement,Others",
      type: "Select",
      status: "Active",
    },
    {
      form_id: 0,
      question_id: 4,
      order: 2,
      label: "Company's Registration No",
      options: "NA",
      type: "Text Input",
      status: "Active",
    },
  ]);

  const [answerData, setAnswerData] = useState([]);
  // function to handle user's answer
  const handleAnswerChange = (questionId, answer) => {
    // search if question already exists in answerData
    const index = answerData.findIndex(
      (item) => item.question_id === questionId
    );
    if (index === -1) {
      // if question not found, add new object to answerData array
      setAnswerData((prevState) => [
        ...prevState,
        { question_id: questionId, answer: answer },
      ]);
    } else {
      // if question already exists, update answer
      const newArray = [...answerData];
      newArray[index] = { question_id: questionId, answer: answer };
      setAnswerData(newArray);
    }
  };

  // Order questions based on their 'order' key
  const questionDataFormatted = questionData.sort((q1, q2) =>
    q1.order > q2.order ? 1 : -1
  );

  const handleSubmit = () => {
    // event.preventDefault();
    // fetch('/api/submit', {
    //   method: 'POST',
    //   body: JSON.stringify(answerData),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
    console.log(answerData);
  };

  //   console.log(answerData);

  // Need to GET formData based on workflow ID
  // Once formData is returned, get the list of questions based on form ID
  // sooo use nested axios get request

  return (
    <>
      <Typography variant='h5' sx={{ pb: 4 }}>
        {workflowData.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Item sx={{ color: "grey" }}>
            {workflowData.description}
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
                handleAnswerChange={handleAnswerChange}
                answerData = {answerData}
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
