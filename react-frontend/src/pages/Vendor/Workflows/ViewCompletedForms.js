
import { Divider, Typography } from "@mui/material";
import React, { useState ,useEffect} from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CompletedFormTable from "../../../components/UserAccountComponents/CompletedFormTable.js";



const ViewCompletedForms = () => {
  
  const [ tableData, setTableData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/completedform")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])


  console.log(tableData)
  return (

    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        All Accounts
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <CompletedFormTable/>
    </>

  );
}

export default ViewCompletedForms



