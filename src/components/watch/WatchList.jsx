import React from 'react';
import './WatchList.style.css';

const WatchList = ({ id }) => {
  const url = `https://www.youtube.com/embed/${id}?autoplay=1` || '';
  return (
    <iframe
      src={url}
      frameBorder="0"
      title="Watchlist"
      className="watchlist small"
    ></iframe>
  );
};

export default WatchList;
