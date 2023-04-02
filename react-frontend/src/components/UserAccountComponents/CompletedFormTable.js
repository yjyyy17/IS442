import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Add, Description, DryCleaning } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import autoTable from 'jspdf-autotable'


import pako from 'pako';


function downloadPdf(formId,userId,formNumber,data,title,description){

    var doc = new jsPDF();
    var questionArrList = []
    var y_counter = 0;


  for(var i =0; i <data.length ; i++){
    questionArrList.push([data[i][i+1]['question'],data[i][i+1]['response']])
  }

  //Image 
  var imgURL = 'https://static.wixstatic.com/media/4ebc73_49f82740a16644d195b1ee67ff4899d3~mv2.png/v1/fill/w_180,h_163,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/circle-logo.png';

  doc.addImage(imgURL, 'JPEG', 184 ,5, 18, 18);
  doc.setFontSize(8)
  doc.setTextColor(48,120,480);
  doc.text(182, 27, "Quantum Leap Inc");




  //User Id
  doc.setFontSize(10)
  doc.setTextColor(0,0,0);
  doc.text(8, 10, `UserId : ${userId}` );

  //form Id
  doc.setFontSize(10)
  doc.text(8, 14, `FormId : ${formId}` );

  //form number
  doc.setFontSize(10)
  doc.text(8, 18, `FormNumber : ${formNumber}`);



  // doc title
  doc.setFontSize(20)
  doc.text(20, 40, title );
  y_counter += 30;


  // Add a description to the document
  doc.setFontSize(12);
  var splitDescription= doc.splitTextToSize(description, 180);
  doc.text(20 ,50, splitDescription);
  y_counter += 40;

  autoTable(doc, {
    startY: y_counter,
    // margin: {horizontal: 7},
    columnStyles: { europe: { halign: 'center' } },
    cellWidth: 'auto'|'wrap'|'number',
    cellPadding:10,
    styles: {columnWidth: 'wrap'},
    columnStyles: {text: {columnWidth: 'auto'}},
    head: [['Question', 'Response']],
    body: questionArrList,
  })

 doc.save(`${formNumber}.pdf`);
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4, 
  }; 

const CompletedFormTable = () => {
  const [completedForm, setcompletedForm] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);



  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/formstatus/completedforms?userId=${userId}`)
      .then((res) => {
        setcompletedForm(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCompletedFormBasedOnFormId = (formId,userId,formNumber,title,description) => {
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/formstatus/questions?userId=${userId}&formId=${formId}',
      headers: { }
    };
    axios.request(config)
    .then((response) => {
      downloadPdf(formId,userId,formNumber,response.data,title,description)
      console.log(JSON.stringify(response.data));
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  // const newCompletedForm = (userGroupId,pdfId,formBlob) => {
  //   const axios = require('axios');
  //   const FormData = require('form-data');
  //   let data = new FormData();
  //   const fileBlob = new Blob([formBlob], { type: 'application/pdf' });
    
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(fileBlob);

  //   const compressedBlob = pako.gzip(new Uint8Array(reader.result));
    
  //   data.append('userGroupId', userGroupId);
  //   data.append('pdfId', pdfId);
  //   data.append('pdf_form',compressedBlob);

  //   // data.append('pdf_form', formBlob);
  //   let config = {
  //     method: 'post',
  //     headers: {'Access-Control-Allow-Origin': '*'},
 
  //     maxBodyLength: Infinity,
  //     url: 'http://localhost:8080/api/addCompletedForm',
  //     // headers: { 
  //     //   ...data.getHeaders()
  //     // },
  //     data : data
  //   };
    
  //   axios.request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // }


  // const editCompletedForm = (userGroupId,pdfId) => {
  //   navigate(`../vendor/update?user_group_id=${userGroupId}&pdf_id=${pdfId}`);
  // };

  // const deleteCompletedForm = (pdfId) => {
  //   axios
  //     .delete(`http://localhost:8080/api/completedForm/${pdfId}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("CompletedForm successfully deleted");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };



  return (
    <>
      <div className="d-flex justify-content-between">
        <TextField
          label="Search"
          sx={{ mb: 4 }}
          onChange={(e) => setSearchedVal(e.target.value)}
        />
        <div className="row align-items-center">

          {/* <Button variant="contained" color="primary" onClick={newCompletedForm}>
            <Add />
            New
          </Button> */}

            {/* <Button onClick={handleOpen}> <Add />
            New</Button>
            
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              

                           
                    <form>
                    <label>Form ID </label>
                    <input
                    name="formID"
                    type="number"
                    />

                    <text><br></br></text>
                    <text><br></br></text>
                    
                    <label>Pdf Id: </label>
                    <input
                    name="pdfId"
                    type="number"
                    />
                    <text><br></br></text>
                    <text><br></br></text>

                    <input name = "pdfFile" type="file"/>

                    <text><br></br></text>
                    <text><br></br></text>

                    
                    

                </form> 
                <Button variant="contained" color="primary" onClick={() => newCompletedForm(parseInt(document.querySelector("form input[name='userGroupId']").value) ,parseInt(document.querySelector("form input[name='pdfId']").value),document.querySelector("form input[name='pdfFile']").files[0] )}>
                            <Add />
                            New
                </Button>
              
            </Box>
            


               
                
            </Modal> */}

        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Form ID</TableCell>
              <TableCell>Form </TableCell>

              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>PDF</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {completedForm
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.FormId
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.formNumber
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())||
                  row.title
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())||

                  row.description
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.FormId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.FormId}</TableCell>
                  {/* <TableCell>{item.pdfId}</TableCell> */}
                  <TableCell>{item.formNumber}</TableCell>

                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>

                  <TableCell>
                    <Button>
                        <PictureAsPdfIcon
                        variant="contained"
                        //   sx={{ backgroundColor: "#93C019" }}

                        onClick={() => getCompletedFormBasedOnFormId(item.FormId,userId,item.formNumber,item.title,item.description)}
                        >
                            
                        </PictureAsPdfIcon>
                    </Button>
                  </TableCell>

                
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};


export default CompletedFormTable;
