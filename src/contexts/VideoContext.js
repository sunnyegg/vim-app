import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ChannelContext } from './ChannelContext';
import restructure from '../helpers/restructureVideo';

export const VideoContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const VideoContextProvider = (props) => {
  const { channels } = useContext(ChannelContext);
  const [videoData, setVideoData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState({
    liveVideos: [],
    completedVideos: [],
    upcomingVideos: [],
  });

  const getVideos = async (channelsData, videos) => {
    let liveVideos;
    let upcomingVideos;
    let completedVideos;

    for (const channel of channelsData) {
      liveVideos = restructure(videos, channel, 'live');
      upcomingVideos = restructure(videos, channel, 'upcoming');
      completedVideos = restructure(videos, channel, 'completed');
    }

    const allVideos = {
      liveVideos,
      upcomingVideos,
      completedVideos,
    };

    setVideos(allVideos);
  };

  const getAll = async (url, page) => {
    setLoading(true);

    if (page >= 20) {
      setMaxPage(true);
      setLoading(false);
    } else {
      const videos = await axios
        .get(`${url}/api/v1/videos?page=${page}`)
        .catch((err) => {
          console.error(err.message);
          setError(true);
        });

      if (videos) {
        setVideoData(videos.data.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAll(URL, page);
  }, [page]);

  useEffect(() => {
    getVideos(channels, videoData);
  }, [channels, videoData]);

  return (
    <VideoContext.Provider
      value={{ videos, loading, error, page, setPage, maxPage }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
