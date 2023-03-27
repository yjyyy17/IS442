import { Button } from 'bootstrap'
import React, { useState ,useEffect} from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';



// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is word' },
//   ];


const columns: GridColDef[] = [
    { field: 'pdfId', headerName: 'PDF ID', width: 150 },
    { field: 'form', headerName: 'PDF FORM', width: 150 },
  ];

console.log("viewcompleted forms")
const ViewCompletedForms = () => {
  
  const [ tableData, setTableData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/completedform")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])


  console.log(tableData)
  return (
    <><div>ViewCompletedForms</div><div style={{ height: 300, width: '100%' }}>
      <DataGrid getRowId={row => row.userGroupId} rows={tableData} columns={columns} />
    </div></>
  );
}

export default ViewCompletedForms



