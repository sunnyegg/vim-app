import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ChannelContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState([]);

  const getChannels = async () => {
    try {
      const dataChannels = await axios.get(`${URL}/api/v1/channels`);
      if (dataChannels) {
        setChannels(dataChannels.data.data);
      }
    } catch (err) {
      console.log('error')
      console.error(err);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);
  return (
    <ChannelContext.Provider value={{ channels }}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
