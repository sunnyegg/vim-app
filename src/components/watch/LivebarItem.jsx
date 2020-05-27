import React from 'react';
import './LivebarItem.style.scss';

const LivebarItem = ({
  video,
  watchList,
  addWatchList,
  removeWatch,
  handleChat,
}) => {
  return (
    <li className="livebar-item" key={video.videoId}>
      <img
        src={video.thumbnail}
        alt="thumbnail"
        title={video.channelName}
        className="background"
        onClick={() =>
          addWatchList({ id: video.videoId, showChat: video.showChat })
        }
      />
      <img
        src={video.channelIcon}
        alt="icon"
        className="animation-pulse vtuber"
        onClick={() =>
          addWatchList({ id: video.videoId, showChat: video.showChat })
        }
      />
      {watchList?.map((data, index) => {
        if (data.id === video.videoId) {
          return (
            <div key={index}>
              <button
                className="btn-floating red darken-3 z-depth-0 remove-item"
                onClick={() =>
                  removeWatch({ id: video.videoId, showChat: false })
                }
              >
                <i className="material-icons">remove_circle</i>
              </button>
              <button
                className="chat"
                onClick={() =>
                  handleChat({ id: video.videoId, showChat: video.showChat })
                }
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
