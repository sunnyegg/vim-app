import React from 'react';
import './LivebarItem.style.css';

const LivebarItem = ({
  icon,
  thumbnail,
  title,
  videoId,
  watchList,
  addWatchList,
  removeWatch,
}) => {
  const thumbnailPlaceholder =
    'https://via.placeholder.com/480x360.png?text=Loading...';

  const iconPlaceholder =
    'https://via.placeholder.com/80x80.png?text=Loading...';

  return (
    <li className="livebar-item">
      <img
        src={thumbnail || thumbnailPlaceholder}
        alt="thumbnail"
        title={title || ''}
        className="background"
        onClick={() => addWatchList(videoId)}
      />
      <img
        src={icon || iconPlaceholder}
        alt="icon"
        className="animation-pulse vtuber"
        onClick={() => addWatchList(videoId)}
      />
      {watchList.map((id) => {
        if (id === videoId) {
          return (
            <button
              key={videoId}
              className="btn-floating red darken-3 z-depth-0 remove-item"
              onClick={() => removeWatch(videoId)}
            >
              <i className="material-icons">remove_circle</i>
            </button>
          );
        }

        return '';
      })}
    </li>
  );
};

export default LivebarItem;
