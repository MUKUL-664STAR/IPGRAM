// DepartmentRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import CreateDepartment from '../pages/Department/CreateDepartmen';


const DepartmentRoutes = () => {
  return (
    <>
      <Route path="/departments/create" component={CreateDepartment} />

    </>
  );
};

export default DepartmentRoutes;
