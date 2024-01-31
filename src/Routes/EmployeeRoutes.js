// EmployeeRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import EmployeeList from '../pages/Employee/EmployeeList';


const EmployeeRoutes = () => {
  return (
    <>
      <Route path="/employees" component={EmployeeList} />
      {/* Add other employee-related routes as needed */}
    </>
  );
};

export default EmployeeRoutes;
