import React from 'react';
import './WatchList.style.css';

const WatchList = ({ id, layout }) => {
  const url = `https://www.youtube.com/embed/${id}?autoplay=1` || '';
  return (
    <iframe
      src={url}
      frameBorder="0"
      allowFullScreen
      title="Watchlist"
      className={layout === 'small' ? 'watchlist small' : 'watchlist large'}
    ></iframe>
  );
};

export default WatchList;
