import React from 'react';
import './Loadingbar.style.css';

const Loadingbar = () => {
  return (
    <div className="progress loading blue darken-3">
      <div className="indeterminate blue lighten-1"></div>
    </div>
  );
};

export default Loadingbar;
