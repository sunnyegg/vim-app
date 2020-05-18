import React, { useState, useContext, useEffect } from 'react';
import Loadingbar from '../layout/Loadingbar';
import Watchbar from './Watchbar';
import WatchList from './WatchList';
import { VideoContext } from '../../contexts/VideoContext';
import './Watch.style.scss';

const Watch = () => {
  const { videos, loading } = useContext(VideoContext);
  const userLayout = localStorage.getItem('layout') || 'small';
  const [watchList, setWatchList] = useState([]);
  const [layout, setLayout] = useState(userLayout);

  const filterData = (data) => {
    return [...new Set(data)];
  };

  const checkLiveVideos = (videosData) => {
    const watchListUser = localStorage.getItem('watchlist');

    if (watchListUser) {
      let filtered;
      const parsed = JSON.parse(watchListUser);

      if (videosData?.liveVideos?.length) {
        for (const video of videosData.liveVideos) {
          filtered = parsed.filter((id) => id === video.videoId);
        }
      }

      setWatchList(filtered);
    }
  };

  const addWatchList = (id) => {
    if (watchList.length) {
      const filterWatch = filterData([...watchList, id]);
      setWatchList(filterWatch);
      localStorage.setItem('watchlist', JSON.stringify(filterWatch));
    } else {
      setWatchList([id]);
      localStorage.setItem('watchlist', JSON.stringify([id]));
    }
  };

  const removeWatch = (id) => {
    const newWatch = watchList.filter((val) => val !== id);
    setWatchList(newWatch);
    localStorage.setItem('watchlist', JSON.stringify(newWatch));
  };

  useEffect(() => {
    checkLiveVideos(videos);
  }, [videos]);

  const changeLayout = () => {
    if (userLayout === 'small') {
      setLayout('large');
      localStorage.setItem('layout', 'large');
    } else {
      setLayout('small');
      localStorage.setItem('layout', 'small');
    }
  };

  return (
    <>
      {loading ? <Loadingbar /> : ''}
      <Watchbar
        addWatchList={addWatchList}
        changeLayout={changeLayout}
        removeWatch={removeWatch}
        videos={videos?.liveVideos}
        watchList={watchList}
      />
      <div className="watch">
        <div className="watch-content left-alignment">
          {!loading && !videos?.liveVideos?.length ? (
            <p>No live videos...</p>
          ) : (
            watchList?.map((videoId) => {
              return (
                <WatchList
                  key={videoId}
                  id={videoId}
                  layout={layout}
                  watchList={watchList}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Watch;
