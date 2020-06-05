import React from 'react';
import PropTypes from 'prop-types';
import './Settings.style.scss';

const Settings = ({ setDark }) => {
  const changeTheme = () => {
    if (localStorage.getItem('dark') === 'true') {
      localStorage.setItem('dark', 'false');
      setDark('false');
    } else {
      localStorage.setItem('dark', 'true');
      setDark('true');
    }
  };

  return (
    <div className="vim-container settings">
      <h1>Settings</h1>
      <div>
        <div className="label">Clear User Preferences</div>
        <button
          type="button"
          className="waves-effect waves-light btn red"
          onClick={() => localStorage.clear()}
        >
          Clear
        </button>
      </div>
      <div>
        <div className="label">Dark Mode</div>
        <div className="switch">
          <label htmlFor="themeToggle">
            <input
              type="checkbox"
              name="themeToggle"
              onChange={() => changeTheme()}
              checked={localStorage.getItem('dark') === 'true'}
            />
            <span className="lever" />
          </label>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  setDark: PropTypes.string.isRequired,
};

export default Settings;
