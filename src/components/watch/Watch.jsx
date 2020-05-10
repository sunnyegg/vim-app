import React, { useState, useEffect, useContext } from 'react';
import Loadingbar from '../layout/Loadingbar';
import Watchbar from './Watchbar';
import WatchList from './WatchList';
import { VideoContext } from '../../contexts/VideoContext';
import './Watch.style.css';

const Watch = () => {
  const { videos } = useContext(VideoContext);
  const userLayout = localStorage.getItem('layout') || 'small';
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const [layout, setLayout] = useState(userLayout);

  const filterData = (data) => {
    return [...new Set(data)];
  };

  const addWatchList = (id) => {
    if (watchList.length) {
      const filterWatch = filterData([...watchList, id]);
      setWatchList(filterWatch);
    } else {
      setWatchList([id]);
    }
  };

  const removeWatch = (id) => {
    const newWatch = watchList.filter((val) => val !== id);
    setWatchList(newWatch);
  };

  const changeLayout = () => {
    if (userLayout === 'small') {
      setLayout('large');
      localStorage.setItem('layout', 'large');
    } else {
      setLayout('small');
      localStorage.setItem('layout', 'small');
    }
  };

  useEffect(() => {
    if (videos) {
      setLoading((loading) => !loading);
    }
  }, [videos]);

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
          {!loading && !videos?.liveVideos.length ? (
            <p>No live videos...</p>
          ) : (
            watchList.map((videoId) => {
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
