/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// Packages
import React, { useContext } from 'react';

// Contexts
import { WatchContext } from '../../contexts/WatchContext';

// Other
import '../../styles/components.scss';

const LivebarItem = ({ video }) => {
  const {
    addWatchList, removeWatch, handleChat, watchList,
  } = useContext(
    WatchContext,
  );

  return (
    <li className="livebar-item" key={video.videoId}>
      <img
        src={video.thumbnail}
        alt="thumbnail"
        title={video.channelName}
        className="background"
        onClick={() => addWatchList({ id: video.videoId, showChat: video.showChat })}
        onKeyDown={() => addWatchList({ id: video.videoId, showChat: video.showChat })}
      />
      <img
        src={video.channelIcon}
        alt="icon"
        className="animation-pulse vtuber"
        onClick={() => addWatchList({ id: video.videoId, showChat: video.showChat })}
        onKeyDown={() => addWatchList({ id: video.videoId, showChat: video.showChat })}
      />
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

export default LivebarItem;
