// DepartmentCreate.js
import React, { useState } from 'react';

const DepartmentCreate = () => {
  const [departmentName, setDepartmentName] = useState('');

  const handleCreateDepartment = async () => {
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: departmentName }),
      });

      if (response.ok) {
        // Department created successfully, you can handle the success accordingly
        console.log('Department created successfully');
      } else {
        // Handle error response
        console.error('Failed to create department');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Internal Server Error', error);
    }
  };

  return (
    <div>
      <h2>Create Department</h2>
      <form>
        <label>
          Department Name:
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleCreateDepartment}>
          Create Department
        </button>
      </form>
    </div>
  );
};

export default DepartmentCreate;
