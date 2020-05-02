import React, { useState, useEffect, useContext } from 'react';
import Loadingbar from '../layout/Loadingbar';
import Watchbar from './Watchbar';
import WatchList from './WatchList';
import { VideoContext } from '../../contexts/VideoContext';
import './Watch.style.css';

const Watch = () => {
  const { videos } = useContext(VideoContext);
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

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

  useEffect(() => {
    if (videos) {
      setLoading((loading) => !loading);
    }
  }, [videos]);

  return (
    <>
      {loading ? <Loadingbar /> : ''}
      <div className="watch">
        {!videos?.liveVideos.length ? (
          <p>No live videos...</p>
        ) : (
          <>
            <Watchbar
              videos={videos?.liveVideos}
              watchList={watchList}
              addWatchList={addWatchList}
              removeWatch={removeWatch}
            />
            <div className="watch-content left-alignment">
              {watchList.map((videoId) => {
                return <WatchList key={videoId} id={videoId} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Watch;
