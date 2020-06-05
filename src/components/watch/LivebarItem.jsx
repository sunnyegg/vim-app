import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WatchContext } from '../../contexts/WatchContext';
import './LivebarItem.style.scss';

const LivebarItem = ({ video }) => {
  const {
    addWatchList, removeWatch, handleChat, watchList,
  } = useContext(
    WatchContext,
  );

  return (
    <li className="livebar-item" key={video.videoId}>
      <div
        role="presentation"
        onClick={() => {
          addWatchList({ id: video.videoId, showChat: video.showChat });
        }}
        onKeyDown={() => {
          addWatchList({ id: video.videoId, showChat: video.showChat });
        }}
      >
        <img
          src={video.thumbnail}
          alt="thumbnail"
          title={video.channelName}
          className="background"
        />
        <img
          src={video.channelIcon}
          alt="icon"
          className="animation-pulse vtuber"
        />
      </div>
      {watchList.map((data) => {
        if (data.id === video.videoId) {
          return (
            <div key={data.id}>
              <button
                type="button"
                className="btn-floating red darken-3 z-depth-0 remove-item"
                onClick={() => {
                  removeWatch({ id: video.videoId, showChat: false });
                }}
              >
                <i className="material-icons">remove_circle</i>
              </button>
              <button
                type="button"
                className="chat"
                onClick={() => {
                  handleChat({ id: video.videoId, showChat: video.showChat });
                }}
              >
                <i className="material-icons">chat</i>
              </button>
            </div>
          );
        }

        return '';
      })}
    </li>
  );
};

LivebarItem.propTypes = {
  video: PropTypes.shape.isRequired,
};

export default LivebarItem;
