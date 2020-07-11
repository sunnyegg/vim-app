import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ChannelContext } from './ChannelContext';
import restructure from '../helpers/restructureVideo';

export const VideoContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const VideoContextProvider = ({ children }) => {
  const { channels } = useContext(ChannelContext);
  const [videoData, setVideoData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40);
  const [maxPage, setMaxPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState({
    liveVideos: [],
    completedVideos: [],
    upcomingVideos: [],
  });

  const getVideos = async (channelsData, videosData) => {
    let liveVideos = [];
    let upcomingVideos = [];
    let completedVideos = [];

    channelsData.forEach((channel) => {
      liveVideos = restructure(videosData, channel, 'live');
      upcomingVideos = restructure(videosData, channel, 'upcoming');
      completedVideos = restructure(videosData, channel, 'completed');
    });

    const allVideos = {
      liveVideos,
      upcomingVideos,
      completedVideos,
    };

    setVideos(allVideos);
  };

  const getAll = async (inputPage, inputLimit) => {
    setLoading(true);

    const data = await axios
      .get(`${URL}/api/v1/videos?page=${inputPage}&limit=${inputLimit}`)
      .catch(() => setError(true));

    if (data) {
      if (inputPage > 1) {
        setVideoData((currentData) => [...currentData, ...data.data.data]);
        setLoading(false);
      } else {
        setVideoData(data.data.data);
        setLoading(false);
      }
    }

    const { totalPage } = data.data.pagination;

    if (inputPage >= totalPage) {
      setMaxPage(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll(page, limit);
  }, [page, limit]);

  useEffect(() => {
    getVideos(channels, videoData);
  }, [channels, videoData]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        loading,
        error,
        page,
        setPage,
        maxPage,
        setLimit,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

VideoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VideoContextProvider;
