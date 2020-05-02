import React from 'react';
import LivebarItem from './LivebarItem';
import './Watchbar.style.css';

const Watchbar = ({ addWatchList, removeWatch, watchList, videos }) => {
  return (
    <div className="watchbar">
      <div className="livebar">
        <ul className="livebar-content">
          {videos.map((video) => {
            return (
              <LivebarItem
                key={video.videoId}
                icon={video.channelIcon}
                thumbnail={video.thumbnail}
                title={video.title}
                videoId={video.videoId}
                watchList={watchList}
                addWatchList={addWatchList}
                removeWatch={removeWatch}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Watchbar;
