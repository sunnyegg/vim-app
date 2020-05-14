import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StatisticsContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const StatisticsContextProvider = (props) => {
  const [statistics, setStatistics] = useState([]);

  const getStatistics = async () => {
    const dataStatistics = await axios
      .get(`${URL}/api/v1/statistics`)
      .catch((err) => {
        console.error(err);
      });

    if (dataStatistics) {
      setStatistics(dataStatistics.data.data);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ statistics }}>
      {props.children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsContextProvider;
