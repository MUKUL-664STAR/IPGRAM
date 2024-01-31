import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css";
const Navbar = () => {
  return (
    <div className='navbar'><nav>
    <ul className='nav-brand'>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/departments/create">Create Department</Link></li>
      <li><Link to="/employees">Employee List</Link></li>
    </ul>
  </nav></div>
  )
}

export default Navbar