import React, { useState, useContext, useEffect } from 'react';
import Loadingbar from '../layout/Loadingbar';
import Watchbar from './Watchbar';
import WatchList from './WatchList';
import { VideoContext } from '../../contexts/VideoContext';
import removeDuplicates from '../../helpers/removeDuplicates';
import './Watch.style.scss';

const Watch = () => {
  const { videos, loading } = useContext(VideoContext);
  const userLayout = localStorage.getItem('layout') || 'small';
  const [watchList, setWatchList] = useState([]);
  const [layout, setLayout] = useState(userLayout);

  const checkLiveVideos = (videosData) => {
    const watchListUser = localStorage.getItem('watchlist');

    if (watchListUser) {
      let filtered;
      const parsed = JSON.parse(watchListUser);

      if (videosData?.liveVideos?.length) {
        for (const video of videosData.liveVideos) {
          filtered = parsed.filter(
            (watchList) => watchList.id === video.videoId
          );
        }
      }

      setWatchList(filtered);
    }
  };

  const addWatchList = (data) => {
    if (watchList?.length) {
      const filterWatch = removeDuplicates([...watchList, data]);
      setWatchList(filterWatch);
      localStorage.setItem('watchlist', JSON.stringify(filterWatch));
    } else {
      setWatchList([data]);
      localStorage.setItem('watchlist', JSON.stringify([data]));
    }
  };

  const removeWatch = (data) => {
    const newWatch = watchList.filter((val) => val.id !== data.id);
    setWatchList(newWatch);
    localStorage.setItem('watchlist', JSON.stringify(newWatch));
  };

  const handleChat = (data) => {
    if (watchList?.length) {
      const newWatch = watchList.map((video) => {
        if (data.id === video.id) {
          video.showChat = !video.showChat;
        }

        return video;
      });
      setWatchList(newWatch);
      localStorage.setItem('watchlist', JSON.stringify(newWatch));
    }
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
        handleChat={handleChat}
        videos={videos?.liveVideos}
        watchList={watchList}
      />
      <div className="watch">
        <div className="watch-content">
          {!loading && !videos?.liveVideos?.length ? (
            <p>No live videos...</p>
          ) : (
            watchList?.map((video) => {
              return (
                <WatchList
                  key={video.id}
                  video={video}
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
