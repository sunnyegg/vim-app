import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.style.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-content">
        <li className="sidebar-item">
          <span className="tooltip">Home</span>
          <Link to="/" className="sidebar-link">
            <i className="icon material-icons">home</i>
          </Link>
        </li>
        <li className="sidebar-item">
          <span className="tooltip">Watch</span>
          <Link to="/watch" className="sidebar-link">
            <i className="icon material-icons">play_circle_filled</i>
          </Link>
        </li>
        <li className="sidebar-item">
          <span className="tooltip">Vtuber List</span>
          <Link to="/vtubers" className="sidebar-link">
            <i className="icon material-icons">group</i>
          </Link>
        </li>
        <li className="sidebar-item">
          <span className="tooltip">Settings</span>
          <Link to="/settings" className="sidebar-link">
            <i className="icon material-icons">settings</i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
