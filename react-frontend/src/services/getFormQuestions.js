import axios from "axios";

const getFormQuestions = async (formId) => {
  var url = "http://localhost:8080/api/questions/" + formId
  return axios
    .get(url)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
};

export default getFormQuestions;
