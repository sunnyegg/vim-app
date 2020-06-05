import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WatchContext } from '../../contexts/WatchContext';
import './WatchList.style.scss';

const WatchList = ({ video }) => {
  const { watchList } = useContext(WatchContext);
  const vim = process.env.REACT_APP_VIM_URL;
  const layout = localStorage.getItem('layout') || 'small';

  const url = `https://www.youtube.com/embed/${video.id}?enablejsapi=1`;
  const chat = `https://www.youtube.com/live_chat?v=${video.id}&embed_domain=${vim}`;

  const handleLayout = () => {
    if (watchList.length < 2) return 'watchlist-content max';
    if (video.showChat) return `watchlist-content ${layout} hasChat`;
    return `watchlist-content ${layout}`;
  };

  return (
    <div className={handleLayout}>
      <iframe
        src={url}
        allow="encrypted-media"
        allowFullScreen
        frameBorder="0"
        title="Watchlist"
        className="vim-player"
      />
      {video.showChat ? (
        <iframe
          src={chat}
          allow="encrypted-media"
          frameBorder="0"
          title="Chat"
          className="vim-chat"
        />
      ) : (
        ''
      )}
    </div>
  );
};

WatchList.propTypes = {
  video: PropTypes.shape.isRequired,
};

export default WatchList;
