
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = ({ match }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const employeeId = match.params.id;

      try {
        const response = await axios.get(`/api/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployeeDetails();
  }, [match.params.id]);

  return (
    <div>
      {/* Display employee details */}
      <h2>Employee Details Page</h2>
      {employee && (
        <div>
          <p>Name: {employee.name}</p>
          <p>Location: {employee.location}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;

