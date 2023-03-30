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
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import pako from 'pako';

function downloadBlob(compressedBlob){
  const reader = new FileReader();
  var myblob = new Blob([compressedBlob])
    // , {
    // type: 'application/pdf'
// });
  console.log(myblob)
  reader.readAsArrayBuffer(myblob);
  const arrayBuffer = reader.result;
  const uint8Array = new Uint8Array(arrayBuffer);
  
  const decompressedUint8Array = pako.ungzip(uint8Array);
  console.log(decompressedUint8Array)
  const decompressedBlob = new Blob([decompressedUint8Array], { type: 'application/pdf' });
  // create a URL object from the decompressedBlob
  const url = URL.createObjectURL(decompressedBlob);

  // create a hyperlink with download attribute that points to the URL
  const link = document.createElement('a');
  link.href = url;
  link.download = 'decompressed.pdf';
  link.click();

  // release the URL object
  URL.revokeObjectURL(url);

  return "Pdf downloaded"
  
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
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/completedform`)
      .then((res) => {
        setcompletedForm(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [completedForm]);

  

  const getCompletedFormBasedOnUserGroupId = (userGroupId,pdfId) => {
    axios
      .post(`http://localhost:8080/api/completedform?userGroupId=${userGroupId}&pdfId=${pdfId}`)
      .then((res) => {
        console.log(res.data['form']);
        console.log(typeof res.data['form'])
        downloadBlob(res.data['form']);
        alert("CompletedForm successfully gotten");
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  
  const newCompletedForm = (userGroupId,pdfId,formBlob) => {
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    const fileBlob = new Blob([formBlob], { type: 'application/pdf' });
    
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileBlob);

    const compressedBlob = pako.gzip(new Uint8Array(reader.result));
    
    data.append('userGroupId', userGroupId);
    data.append('pdfId', pdfId);
    data.append('pdf_form',compressedBlob);

    // data.append('pdf_form', formBlob);
    let config = {
      method: 'post',
      headers: {'Access-Control-Allow-Origin': '*'},
 
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/addCompletedForm',
      // headers: { 
      //   ...data.getHeaders()
      // },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  }

  // const newCompletedForm = (userGroupId,pdfId,formBlob) => {
  //   const axios = require('axios');
  //   const FormData = require('form-data');
  //   let data = new FormData();
  //   data.append('userGroupId', userGroupId);
  //   data.append('pdfId', pdfId);
  //   data.append('pdf_form', formBlob);
    
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

  const editCompletedForm = (userGroupId,pdfId) => {
    navigate(`../vendor/update?user_group_id=${userGroupId}&pdf_id=${pdfId}`);
  };

  const deleteCompletedForm = (pdfId) => {
    axios
      .delete(`http://localhost:8080/api/completedForm/${pdfId}`)
      .then((res) => {
        console.log(res.data);
        alert("CompletedForm successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };



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

            <Button onClick={handleOpen}> <Add />
            New</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              

                           
                    <form>
                    <label>User Group Id: </label>
                    <input
                    name="userGroupId"
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
            


               
                
            </Modal>

        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Group Id</TableCell>
              <TableCell>PDF ID </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedForm
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.userGroupId
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.pdfId
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.userGroupId.item.pdfId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.userGroupId}</TableCell>
                  <TableCell>{item.pdfId}</TableCell>
                  <TableCell>
                    <Button>
                        <PictureAsPdfIcon
                        variant="contained"
                        //   sx={{ backgroundColor: "#93C019" }}
                        onClick={() => getCompletedFormBasedOnUserGroupId(item.userGroupId,item.pdfId)}
                        >
                            
                        </PictureAsPdfIcon>
                    </Button>
                  

                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#93C019" }}
                      onClick={() => editCompletedForm(item.userGroupId,item.pdfId)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteCompletedForm(item.pdfId)}
                    >
                      Delete
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
