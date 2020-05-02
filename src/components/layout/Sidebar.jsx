import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.style.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-content">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">
            <i className="icon material-icons">home</i>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/watch" className="sidebar-link">
            <i className="icon material-icons">play_circle_filled</i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
