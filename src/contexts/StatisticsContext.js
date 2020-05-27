import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StatisticsContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const StatisticsContextProvider = (props) => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getStatistics = async () => {
    const dataStatistics = await axios
      .get(`${URL}/api/v1/statistics`)
      .catch((err) => {
        console.error(err.message);
        setError(true);
      });

    if (dataStatistics) {
      setStatistics(dataStatistics.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ statistics, loading, error }}>
      {props.children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsContextProvider;
