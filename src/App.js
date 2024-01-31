// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/auth/Singup';
import Login from './components/auth/Login';
import CreateDepartment from './pages/Department/CreateDepartmen';
import EmployeeList from './pages/Employee/EmployeeList';
import Navbar from './Navbar';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/departments/create" element={<CreateDepartment />} />
          <Route path="/employees" element={<EmployeeList />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
