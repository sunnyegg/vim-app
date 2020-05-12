import React from 'react';

import './Settings.style.scss';

const Settings = (props) => {
  const { setDark } = props;
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
      <div className="label">Dark Mode</div>
      <div className="switch">
        <label>
          <input
            type="checkbox"
            name="dark"
            onChange={() => changeTheme()}
            checked={localStorage.getItem('dark') === 'true'}
          />
          <span className="lever"></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
