import React, { useState, useContext } from 'react';
import LivebarItem from './LivebarItem';
import { VideoContext } from '../../contexts/VideoContext';
import { WatchContext } from '../../contexts/WatchContext';
import './Watchbar.style.scss';

const Watchbar = () => {
  const { changeLayout } = useContext(WatchContext);
  const { videos } = useContext(VideoContext);
  const [fullscreen, setFullscreen] = useState(false);
  const [watchbar, setWatchbar] = useState(true);

  const toggleFullscreen = () => {
    if (!fullscreen) {
      const page = document.documentElement;

      if (page.requestFullscreen) {
        page.requestFullscreen();
      } else if (page.mozRequestFullScreen) {
        page.mozRequestFullScreen();
      } else if (page.webkitRequestFullscreen) {
        page.webkitRequestFullscreen();
      } else if (page.msRequestFullscreen) {
        page.msRequestFullscreen();
      }

      setFullscreen((current) => !current);
    } else {
      const page = document;

      if (fullscreen) {
        if (page.exit) {
          page.exitFullscreen();
        } else if (page.mozCancelFullScreen) {
          page.mozCancelFullScreen();
        } else if (page.webkitExitFullscreen) {
          page.webkitExitFullscreen();
        } else if (page.msExitFullscreen) {
          page.msExitFullscreen();
        }

        setFullscreen((current) => !current);
      }
    }
  };

  const sidebarEl = document.getElementsByClassName('sidebar')[0];
  const watchEl = document.getElementsByClassName('watch')[0];
  const watchbarEl = document.getElementsByClassName('watchbar')[0];

  const toggleSidebar = () => {
    sidebarEl.classList.toggle('hide-sidebar');
    watchEl.classList.toggle('no-sidebar');
    watchbarEl.classList.toggle('no-margin');
  };

  const toggleWatchbar = () => {
    const checkSidebar = sidebarEl.classList.contains('hide-sidebar');
    const checkWatchNoMargin = watchbarEl.classList.contains('no-margin');
    const checkWatchbar = watchbarEl.classList.contains('hide-watchbar');

    if (checkWatchNoMargin || checkWatchbar) {
      watchbarEl.classList.toggle('no-margin');
    }

    if (!checkSidebar) {
      watchbarEl.classList.remove('no-margin');
    }

    watchEl.classList.toggle('no-watchbar');
    watchbarEl.classList.toggle('hide-watchbar');

    setWatchbar((current) => !current);
  };

  return (
    <>
      <div className="watchbar lighten-3">
        <div
          className={videos.length < 12 ? 'livebar' : 'livebar scroll-vertical'}
        >
          <ul className="livebar-content">
            {videos.liveVideos.length
              ? videos.liveVideos.map((video) => (
                <LivebarItem key={video.videoId} video={video} />
              ))
              : ''}
          </ul>
        </div>
        <div className="livecontrol">
          <button
            type="button"
            className="waves-effect waves-dark btn-flat"
            onClick={changeLayout}
            title="Change Layout"
          >
            <i className="material-icons icon">grid_on</i>
          </button>
          <button
            type="button"
            className="waves-effect waves-dark btn-flat"
            onClick={toggleFullscreen}
            title="Fullscreen"
          >
            <i className="material-icons icon">fullscreen</i>
          </button>
          <button
            type="button"
            className="waves-effect waves-dark btn-flat"
            onClick={toggleSidebar}
            title="Hide Sidebar"
          >
            <i className="material-icons icon">arrow_back</i>
          </button>
          <button
            type="button"
            className="waves-effect waves-dark btn-flat"
            onClick={toggleWatchbar}
            title="Hide Watchbar"
          >
            <i className="material-icons icon">arrow_upward</i>
          </button>
        </div>
      </div>
      {!watchbar ? (
        <button
          type="button"
          className="waves-effect waves-dark btn-flat show-watchbar"
          onClick={toggleWatchbar}
          title="Show Watchbar"
        >
          <i className="material-icons icon">arrow_downward</i>
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default Watchbar;
