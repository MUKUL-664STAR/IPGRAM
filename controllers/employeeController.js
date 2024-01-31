const Employee = require('../models/Employee');
const User = require('../models/User');
const Department = require('../models/Department');


exports.create = async (req, res) => {
  try {
    const { name, location, departmentId } = req.body;

    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(403).json({ error: 'Unauthorized' });
    }


    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    
    const employee = new Employee({
      name,
      location,
      department: departmentId,
    });

    await employee.save();

    // Add the employee to the department
    department.employees.push(employee._id);
    await department.save();

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// List all employees
exports.list = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department', 'name');

    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a specific employee
exports.details = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId).populate('department', 'name');

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if the authenticated user is the manager of the employee's department
    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager' || !employee.department.equals(manager.department)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an employee
exports.update = async (req, res) => {
  try {
    const { name, location } = req.body;
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if the authenticated user is the manager of the employee's department
    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager' || !employee.department.equals(manager.department)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the employee
    employee.name = name;
    employee.location = location;
    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an employee
exports.delete = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if the authenticated user is the manager of the employee's department
    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager' || !employee.department.equals(manager.department)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Remove the employee from the department
    const department = await Department.findById(employee.department);
    department.employees = department.employees.filter(e => !e.equals(employee._id));
    await department.save();

    // Delete the employee
    await employee.remove();

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
