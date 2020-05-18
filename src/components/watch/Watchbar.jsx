import React, { useState } from 'react';
import LivebarItem from './LivebarItem';
import './Watchbar.style.scss';

const Watchbar = ({
  addWatchList,
  changeLayout,
  removeWatch,
  watchList,
  videos,
}) => {
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

  const toggleSidebar = () => {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const watch = document.getElementsByClassName('watch')[0];
    const watchbar = document.getElementsByClassName('watchbar')[0];
    sidebar.classList.toggle('hide-sidebar');
    watch.classList.toggle('no-sidebar');
    watchbar.classList.toggle('no-margin');
  };

  const toggleWatchbar = () => {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const watch = document.getElementsByClassName('watch')[0];
    const watchbar = document.getElementsByClassName('watchbar')[0];
    const checkSidebar = sidebar.classList.contains('hide-sidebar');
    const checkWatchNoMargin = watchbar.classList.contains('no-margin');
    const checkWatchbar = watchbar.classList.contains('hide-watchbar');

    if (checkWatchNoMargin || checkWatchbar) {
      watchbar.classList.toggle('no-margin');
    }

    if (!checkSidebar) {
      watchbar.classList.remove('no-margin');
    }

    watch.classList.toggle('no-watchbar');
    watchbar.classList.toggle('hide-watchbar');

    setWatchbar((current) => !current);
  };

  return (
    <>
      <div className="watchbar lighten-3">
        <div
          className={
            videos?.length < 12 ? 'livebar' : 'livebar scroll-vertical'
          }
        >
          <ul className="livebar-content">
            {videos?.map((video) => {
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
          <button
            className="waves-effect waves-dark btn-flat"
            onClick={toggleFullscreen}
            title="Fullscreen"
          >
            <i className="material-icons icon">fullscreen</i>
          </button>
          <button
            className="waves-effect waves-dark btn-flat"
            onClick={toggleSidebar}
            title="Hide Sidebar"
          >
            <i className="material-icons icon">arrow_back</i>
          </button>
          <button
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
          className="waves-effect waves-dark btn-flat right"
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
