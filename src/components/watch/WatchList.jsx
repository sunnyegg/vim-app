import React from 'react';
import './WatchList.style.scss';

const WatchList = ({ video, watchList }) => {
  const vim = process.env.REACT_APP_VIM_URL;
  const layout = localStorage.getItem('layout') || 'small';

  const url = `https://www.youtube.com/embed/${video.id}?enablejsapi=1`;
  const chat = `https://www.youtube.com/live_chat?v=${video.id}&embed_domain=${vim}`;

  return (
    <div
      className={
        watchList.length < 2
          ? 'watchlist-content max'
          : video.showChat
          ? `watchlist-content ${layout} hasChat`
          : `watchlist-content ${layout}`
      }
    >
      <iframe
        src={url}
        allow="encrypted-media"
        allowFullScreen
        frameBorder="0"
        title="Watchlist"
        className="vim-player"
      ></iframe>
      {video.showChat ? (
        <iframe
          src={chat}
          allow="encrypted-media"
          frameBorder="0"
          title="Chat"
          className="vim-chat"
        ></iframe>
      ) : (
        ''
      )}
    </div>
  );
};

export default WatchList;
