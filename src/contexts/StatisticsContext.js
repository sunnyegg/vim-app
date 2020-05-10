import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ChannelContext } from './ChannelContext';

export const StatisticsContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const StatisticsContextProvider = (props) => {
  const { channels } = useContext(ChannelContext);
  const [statistics, setStatistics] = useState([]);

  const getStatistics = async (channelsData) => {
    try {
      const dataStatistics = channelsData.map(async (vtuber) => {
        const getData = await axios.get(
          `${URL}/api/v1/statistics/${vtuber.id}`
        );
        return getData.data.data;
      });

      const results = await Promise.all(dataStatistics);
      setStatistics(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStatistics(channels);
  }, [channels]);

  return (
    <StatisticsContext.Provider value={{ statistics }}>
      {props.children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsContextProvider;
