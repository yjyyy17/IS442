import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from "../../../mui";

const DynamicForm = ({
  questions,
  onSubmit,
}) => {
  const [selectedOthersDropdown, setSelectedOthersDropdown] =
    useState(null);
  const [selectedOthersRadio, setSelectedOthersRadio] = useState(null);

  const [answerData, setAnswerData] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  // function to handle user's answer
  const handleAnswerChange = (questionId, answer) => {
    // search if question already exists in answerData
    const index = answerData.findIndex(
      (item) => item.questionID === questionId
    );
    if (index === -1) {
      // if question not found, add new object to answerData array
      setAnswerData((prevState) => [
        ...prevState,
        { questionID: questionId, answer: answer },
      ]);
    } else {
      // if question already exists, update answer
      const newArray = [...answerData];
      newArray[index] = { questionID: questionId, answer: answer };
      setAnswerData(newArray);
    }

  };

  const handleSubmit = () => {
    const isAllAnswered = questions.every(
      (question) => answerData.find((answer) => answer.questionID === question.questionID)
    );
    if (isAllAnswered) {
      onSubmit(answerData);
    } else {
      // highlight unanswered questions with red border
      questions.forEach((question) => {
        const input = document.getElementById(question.questionID);
        const answer = answerData.find((answer) => answer.questionID === question.questionID);
        
        if (!answer || !answer.answer) {
          input.style.border = "1px solid red";
          input.parentElement.querySelector("span").style.color = "red";
        }
      }); // <---- add a closing bracket here
      alert("Please answer all questions before submitting");
    }
  }
  

  // function to handle RadioGroup and Select input change
  const handleSelectChange = (event, question) => {
    const answer = event.target.value;
    handleAnswerChange(question.questionID, answer);

    // check if the question has "Others" option and is currently selected
    if (answer === "Others" && question.type === "Dropdown") {
      setSelectedOthersDropdown(question);
    } else {
      // clear answer for the question if "Others" is not selected
      if (
        selectedOthersDropdown &&
        selectedOthersDropdown.questionID === question.questionID
      ) {
        handleAnswerChange(selectedOthersDropdown.questionID, answer);
        setSelectedOthersDropdown(null);
      }
    }
  };

  const handleRadioChange = (event, question) => {
    const answer = event.target.value;
    handleAnswerChange(question.questionID, answer);

    // check if the question has "Others" option and is currently selected
    if (answer === "Others" && question.type === "Radio") {
      setSelectedOthersRadio(question);
    } else {
      // clear answer for the question if "Others" is not selected
      if (
        selectedOthersRadio &&
        selectedOthersRadio.questionID === question.questionID
      ) {
        handleAnswerChange(selectedOthersRadio.questionID, answer);
        setSelectedOthersRadio(null);
      }
    }
  };

  // function to handle TextField input change
  const handleTextFieldChange = (event, question) => {
    const answer = event.target.value;
    handleAnswerChange(question.questionID, answer);
  };

  // render RadioGroup component
  const renderRadioGroup = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        <RadioGroup
          aria-label={question.label}
          name={question.label}
          onChange={(event) => handleRadioChange(event, question)}
        >
          {question.options.split(",").map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        {selectedOthersRadio &&
          selectedOthersRadio.questionID === question.questionID && (
            <Box m={2}>
              <Typography>Please specify:</Typography>
              <TextField
                fullWidth
                onChange={(event) => handleTextFieldChange(event, question)}
              />
            </Box>
          )}
      </Box>
    );
  };

  // render Select component
  const renderSelect = (question) => {
    const answer = answerData.find(
      (ans) => ans.questionID === question.questionID
    );
    const value = answer ? answer.answer : question.options.split(",")[0];

    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        <Select
          value={selectedOthersDropdown ? "Others" : value}
          onChange={(event) => handleSelectChange(event, question)}
          fullWidth
        >
          {question.options.split(",").map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {selectedOthersDropdown &&
          selectedOthersDropdown.questionID === question.questionID && (
            <Box m={2}>
              <Typography>Please specify:</Typography>
              <TextField
                fullWidth
                onChange={(event) => handleTextFieldChange(event, question)}
              />
            </Box>
          )}
      </Box>
    );
  };

  const renderCheckbox = (question) => {
    // The question if the response already exists
    const answerQuestion = answerData.find(
      (ans) => ans.questionID === question.questionID
      );
    

    // current answer state
    const currentOptions = answerQuestion ? answerQuestion.answer.options : [];
    const others = answerQuestion ? answerQuestion.answer.others : false;
    const input = answerQuestion ? answerQuestion.answer.input : "";

    const handleCheckboxChange = (event) => {
      const selectedOption = event.target.value;

      // if "Others" is selected
      if (selectedOption === "Others") {
        // if "Others" is currently checked
        if (others) {
          // remove Others from the String, and remove the text input
          handleAnswerChange(question.questionID, {
            options: currentOptions,
            others: false,
            input: ""
          });
        } else {
          handleAnswerChange(question.questionID, {
            options: currentOptions,
            others: true,
            input: "",
          })
        }
      } else {
        // if already selected, remove from the array
        if (currentOptions && currentOptions.includes(selectedOption)) {
          handleAnswerChange(question.questionID, {
            options: currentOptions.filter((option) => option !== selectedOption),
            others: others,
            input: input
          })
        } else {
          // if not selected, add to the array

          handleAnswerChange(question.questionID, {
            options: [...currentOptions, selectedOption],
            others: others,
            input: input
          })
        }
      }
    };

    const handleTextInput = (e) => {
        handleAnswerChange(question.questionID, {
         options: currentOptions,
         others: true,
         input: e.target.value 
        })
    }

    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        {question.options.split(",").map((option) => (
          <FormControlLabel
            key={option}
            style={{ display: "block" }}
            value={option}
            control={
              <Checkbox
                checked={
                  option ===  'Others' && others ? true :
                  currentOptions ?
                  currentOptions.includes(option) :
                  false
                }
                onChange={handleCheckboxChange}
              />
            }
            label={option}
          />
        ))}
        
        {others && (
            <>
              <Typography>Please specify:</Typography>
              <TextField
                fullWidth
                onChange={(e) => handleTextInput(e)}
              />
            </>
          )}
      </Box>
    );
  };

  // render Text Input component
  const renderTextInput = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        <TextField
          fullWidth
          onChange={(event) =>
            handleAnswerChange(question.questionID, event.target.value)
          }
        />
      </Box>
    );
  };

  const renderTextArea = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        <TextField
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          onChange={(event) =>
            handleAnswerChange(question.questionID, event.target.value)
          }
        />
      </Box>
    );
  };

  const renderDatetime = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography>{question.label}</Typography>
        <TextField
          fullWidth
          type='datetime-local'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) =>
            handleAnswerChange(question.questionID, event.target.value)
          }
        />
      </Box>
    );
  };

  const renderHeading1 = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography variant='h4'>{question.label}</Typography>
      </Box>
    );
  };

  const renderHeading2 = (question) => {
    return (
      <Box m={2} key={question.questionID}>
        <Typography variant='h5'>{question.label}</Typography>
      </Box>
    );
  };

  // map through the questions array and render the appropriate component based on the question type
  const renderQuestion = (question) => {
    if (question.status === "Active") {
      switch (question.type) {
        case "Radio":
          return renderRadioGroup(question);
        case "Dropdown":
          return renderSelect(question);
        case "Text Area":
          return renderTextArea(question);
        case "Heading1":
          return renderHeading1(question);
        case "Heading2":
          return renderHeading2(question);
        case "Checkbox":
          return renderCheckbox(question);
        case "Datetime":
          return renderDatetime(question);
        default:
          return renderTextInput(question);
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      {questions
        .sort((a, b) => a.order - b.order)
        .map((question) => renderQuestion(question))}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default DynamicForm;
