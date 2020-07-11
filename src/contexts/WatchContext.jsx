/* eslint-disable no-param-reassign */
import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { VideoContext } from './VideoContext';

import removeDupes from '../helpers/removeDuplicates';

export const WatchContext = createContext();

const WatchContextProvider = ({ children }) => {
  const { videos, loading } = useContext(VideoContext);
  const userLayout = localStorage.getItem('layout') || 'small';
  const [watchList, setWatchList] = useState([]);
  const [layout, setLayout] = useState(userLayout);

  const checkLiveVideos = (videosData) => {
    const watchListUser = localStorage.getItem('watchlist');

    if (watchListUser) {
      let filtered;
      const parsed = JSON.parse(watchListUser);

      if (videosData.liveVideos.length) {
        videosData.liveVideos.forEach((video) => {
          filtered = parsed.filter((value) => value.id === video.videoId);
        });

        setWatchList(filtered);
      } else {
        setWatchList([]);
      }
    }
  };

  const addWatchList = (data) => {
    if (watchList.length) {
      const allWatches = [...watchList, data];
      const filterWatch = removeDupes(allWatches, 'id');
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
    if (watchList.length) {
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
    checkLiveVideos(videos);
  }, [videos]);

  return (
    <WatchContext.Provider
      value={{
        loading,
        addWatchList,
        removeWatch,
        handleChat,
        changeLayout,
        layout,
        watchList,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

WatchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WatchContextProvider;
