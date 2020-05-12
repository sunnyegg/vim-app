import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ChannelContext } from './ChannelContext';

export const VideoContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const VideoContextProvider = (props) => {
  const { channels } = useContext(ChannelContext);
  const [videos, setVideos] = useState({
    liveVideos: [],
    completedVideos: [],
    upcomingVideos: [],
  });

  const getVideos = async (channelsData) => {
    const getAll = async (api, channel) => {
      try {
        const video = await axios.get(`${api}/api/v1/videos/${channel.id}`);

        if (!video) {
          return null;
        }

        return video;
      } catch (err) {
        if (err.response.status && err.response.status === 404) {
          console.info('no videos');
        } else {
          console.error(err);
        }
      }
    };

    const restructure = async (videoData, channelData, type) => {
      const imgReg = /hqdefault.*/gm;
      const dateNow = new Date().toISOString();

      if (videoData.length) {
        for (const item of videoData) {
          item.thumbnail = item.thumbnail.replace(imgReg, 'maxresdefault.jpg');
          item['channelIcon'] = channelData.channel.channelIcon;
          item['agency'] = channelData.agency;

          if (item.eventType === 'upcoming' && dateNow >= item.date) {
            item.eventType = 'live';
          }
        }

        return videoData.filter((video) => video.eventType === type);
      }

      return [];
    };

    const flatSortFilter = (item) => {
      return item
        .flat(1)
        .sort((a, b) => {
          if (a.eventType === 'upcoming') {
            return new Date(a.date) - new Date(b.date);
          }

          return new Date(b.date) - new Date(a.date);
        })
        .filter((val) => val);
    };

    const liveVideos = channelsData.map(async (channel) => {
      const videos = await getAll(URL, channel);

      if (!videos) {
        return [];
      }

      return restructure(videos.data.data, channel, 'live');
    });

    const upcomingVideos = channelsData.map(async (channel) => {
      const videos = await getAll(URL, channel);

      if (!videos) {
        return [];
      }

      return restructure(videos.data.data, channel, 'upcoming');
    });

    const completedVideos = channelsData.map(async (channel) => {
      const videos = await getAll(URL, channel);

      if (!videos) {
        return [];
      }

      return restructure(videos.data.data, channel, 'completed');
    });

    const resultLive = await Promise.all(liveVideos).then((item) => {
      return flatSortFilter(item);
    });

    const resultUpcoming = await Promise.all(upcomingVideos).then((item) => {
      return flatSortFilter(item);
    });

    const resultComplete = await Promise.all(completedVideos).then((item) => {
      return flatSortFilter(item).splice(0, 8);
    });

    const allVideos = {
      liveVideos: resultLive,
      upcomingVideos: resultUpcoming,
      completedVideos: resultComplete,
    };

    setVideos(allVideos);
  };

  useEffect(() => {
    getVideos(channels);
  }, [channels]);

  return (
    <VideoContext.Provider value={{ videos }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
