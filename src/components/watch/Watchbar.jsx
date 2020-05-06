import React, { useState } from 'react';
import LivebarItem from './LivebarItem';
import './Watchbar.style.css';

const Watchbar = ({
  addWatchList,
  changeLayout,
  removeWatch,
  watchList,
  videos,
}) => {
  return (
    <div className="watchbar grey lighten-3">
      <div
        className={videos.length < 12 ? 'livebar' : 'livebar scroll-vertical'}
      >
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
      <div className="livecontrol">
        <button
          className="waves-effect waves-dark btn-flat"
          onClick={changeLayout}
          title="Change Layout"
        >
          <i className="material-icons icon">grid_on</i>
        </button>
      </div>
    </div>
  );
};

export default Watchbar;
