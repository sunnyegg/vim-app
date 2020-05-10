import React from 'react';
import './WatchList.style.css';

const WatchList = ({ id, layout, watchList }) => {
  const url = `https://www.youtube.com/embed/${id}?autoplay=1` || '';
  return (
    <iframe
      src={url}
      frameBorder="0"
      allowFullScreen
      title="Watchlist"
      className={
        layout === 'small'
          ? 'watchlist small'
          : watchList.length < 2
          ? 'watchlist max'
          : 'watchlist large'
      }
    ></iframe>
  );
};

export default WatchList;
