import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, Baby, GraduationCap, User, ClipboardList } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">
          <BrainCircuit className="brand-icon" />
          <div className="brand-text">
            <span>Adaptive</span>
            <small>Learning</small>
          </div>
        </NavLink>
      </div>

      <div className="navbar-links">

        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <div className="nav-icon-circle"><BrainCircuit size={18} /></div>
          <span>Home</span>
        </NavLink>

        <NavLink to="/kids" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <div className="nav-icon-circle"><Baby size={18} /></div>
          <span>Kids</span>
        </NavLink>

        {/* ✅ Visual → Student */}
        <NavLink to="/student" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <div className="nav-icon-circle"><GraduationCap size={18} /></div>
          <span>Student</span>
        </NavLink>

        {/* ✅ Student → Adult */}
        <NavLink to="/adult" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <div className="nav-icon-circle"><User size={18} /></div>
          <span>Adult</span>
        </NavLink>

        <NavLink to="/exam" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <div className="nav-icon-circle"><ClipboardList size={18} /></div>
          <span>Exam</span>
        </NavLink>

      </div>
    </nav>
  );
};

export default Navbar;