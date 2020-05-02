import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const VtuberContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const VtuberContextProvider = (props) => {
  const [vtubers, setVtubers] = useState([]);

  const getVtubers = async () => {
    try {
      const dataVtubers = await axios.get(`${URL}/api/v1/hololive`);
      if (dataVtubers) {
        setVtubers(dataVtubers.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVtubers();
  }, []);
  return (
    <VtuberContext.Provider value={{ vtubers }}>
      {props.children}
    </VtuberContext.Provider>
  );
};

export default VtuberContextProvider;
