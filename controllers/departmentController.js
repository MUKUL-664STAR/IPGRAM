const Department = require('../models/Department');
const User = require('../models/User');


exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    
    const managerId = req.user.userId;

    
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    
    const department = new Department({
      name,
      manager: managerId,
    });

    await department.save();

    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.list = async (req, res) => {
  try {
    const departments = await Department.find().populate('manager', 'username');

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a department
exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const departmentId = req.params.id;

    
    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

   
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

   
    department.name = name;
    await department.save();

    res.status(200).json({ message: 'Department updated successfully', department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.delete = async (req, res) => {
  try {
    const departmentId = req.params.id;

    
    const managerId = req.user.userId;
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Delete the department
    await department.remove();

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
