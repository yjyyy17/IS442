// import logo from './logo.svg';
import React from 'react';
import "./App.css";
import ListUserComponent from "./components/ListUserComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Vendor from "./pages/Vendor/Vendor"
import Admin from "./pages/Admin/Admin";
import Approver from "./pages/Approver/Approver";
import ViewWorkflows from "./pages/Approver/ViewWorkflows";
import ApproveForms from "./pages/Approver/ViewForms";

import NewUserAccountForm from "./pages/Admin/NewUserAccountForm";
import EditUserAccount from './pages/Admin/EditUserAccount';
import CreateNewForm from './pages/Admin/CreateNewForm';
import EditForm from './pages/Admin/EditForm';
import NewUserGroupForm from './pages/Admin/NewUserGroupForm';
import ViewIndividualWorkflow from './pages/Admin/ViewIndividualWorkflow';
import NewWorkflow from './pages/Admin/NewWorkflow';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/vendor' element={<Vendor />} />
      <Route path='/vendor/indiv_workflow' element={<Vendor />} />
      <Route path='/vendor/forms' element={<Vendor />} />

      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/workflows' element={<Admin />} />
      <Route path='/admin/user_accounts' element={<Admin />} />
      <Route path='/admin/create_account' element={<NewUserAccountForm />} />
      <Route path='/admin/edit_account' element={<EditUserAccount />} />
      <Route path='/admin/create_usergroup' element={<NewUserGroupForm />} />
      <Route path='/admin/forms' element={<Admin />} />
      <Route path='/admin/create_form' element={<CreateNewForm />} />
      <Route path='/admin/edit_form' element={<EditForm />} />
      <Route path='/admin/indiv_workflow' element={<ViewIndividualWorkflow/>} />
      <Route path='/admin/create_workflow' element={<NewWorkflow/>} />
      
      <Route path='/approver' element={<Approver />} />
      <Route path='/approver/user_accounts' element={<Approver />} />
      <Route path='/approver/ViewWorkflows' element={<Approver />} />
      <Route path='/approver/ViewForms' element={<Approver />} />

    </Routes>
    // <div className="App">
    //   <header className="App-header">

    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>

    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>

    //   </header>
    // </div>

    //   <div className="ListUserComponent">
    //   <header className="App-header">

    //       <ListUserComponent/>

    //   </header>

    // </div>
  );
}

export default App;
