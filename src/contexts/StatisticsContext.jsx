/* eslint-disable no-param-reassign */
import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import { ChannelContext } from './ChannelContext';

dayjs.extend(localizedFormat);

export const StatisticsContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const StatisticsContextProvider = ({ children }) => {
  const { channels } = useContext(ChannelContext);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getStatistics = async (channelsData) => {
    const dataStatistics = await axios
      .get(`${URL}/api/v1/statistics`)
      .catch(() => setError(true));

    if (dataStatistics) {
      dataStatistics.data.data.forEach((allData) => {
        channelsData.forEach((channel) => {
          if (channel.id === allData.channelId) {
            const publishedAt = dayjs(
              channel.channel.channelPublishedAt,
            ).format('LL');

            allData.channelName = channel.channel.channelName;
            allData.subscriber = allData.statistics.subscriberCount;
            allData.publishDate = publishedAt;
            allData.agency = channel.agency;
            allData.channelIcon = channel.channel.channelIcon;
            allData.id = channel.id;
            delete allData.statistics;
          }
        });
      });

      dataStatistics.data.data
        .sort((a, b) => b.subscriber - a.subscriber)
        .map((data) => {
          data.subscriber = parseInt(data.subscriber, 0).toLocaleString(
            'id-ID',
          );
          return data;
        });

      setStatistics(dataStatistics.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics(channels);
  }, [channels]);

  return (
    <StatisticsContext.Provider value={{ statistics, loading, error }}>
      {children}
    </StatisticsContext.Provider>
  );
};

StatisticsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StatisticsContextProvider;
