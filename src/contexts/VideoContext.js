import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { VtuberContext } from './VtuberContext';

export const VideoContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const VideoContextProvider = (props) => {
  const { vtubers } = useContext(VtuberContext);
  const [videos, setVideos] = useState({
    liveVideos: [],
    completedVideos: [],
    upcomingVideos: [],
  });

  const getVideos = async (vtubersData) => {
    const getAndRestructure = async (api, data, type) => {
      const imgReg = /hqdefault.*/gm;

      try {
        const video = await axios.get(
          `${api}/api/v1/videos/vliver/${data.id}?eventType=${type}`
        );

        if (video) {
          for (const item of video.data.data) {
            item.thumbnail = item.thumbnail.replace(
              imgReg,
              'maxresdefault.jpg'
            );
            item['channelIcon'] = data.channel.channelIcon;
            item['agency'] = data.agency;
          }

          return video.data.data;
        }

        return [];
      } catch (err) {
        if (err.response.status === 404) {
          console.info('no videos');
        } else {
          console.error(err);
        }
      }
    };

    const flatSortFilter = (item) => {
      return item
        .flat(1)
        .sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
        .filter((val) => val);
    };

    const liveVideos = vtubersData.map(async (vtuber) => {
      return await getAndRestructure(URL, vtuber, 'live');
    });

    const completedVideos = vtubersData.map(async (vtuber) => {
      return await getAndRestructure(URL, vtuber, 'completed');
    });

    const upcomingVideos = vtubersData.map(async (vtuber) => {
      return await getAndRestructure(URL, vtuber, 'upcoming');
    });

    const resultLive = await Promise.all(liveVideos).then((item) => {
      return flatSortFilter(item);
    });

    const resultComplete = await Promise.all(completedVideos).then((item) => {
      return flatSortFilter(item).splice(0, 8);
    });

    const resultUpcoming = await Promise.all(upcomingVideos).then((item) => {
      return flatSortFilter(item);
    });

    const allVideos = {
      liveVideos: resultLive,
      completedVideos: resultComplete,
      upcomingVideos: resultUpcoming,
    };

    setVideos(allVideos);
  };

  useEffect(() => {
    getVideos(vtubers);
  }, [vtubers]);

  return (
    <VideoContext.Provider value={{ videos }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
