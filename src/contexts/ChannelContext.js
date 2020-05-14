import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ChannelContext = createContext();
const URL = process.env.REACT_APP_API_URL;

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getChannels = async () => {
    const dataChannels = await axios
      .get(`${URL}/api/v1/channels`)
      .catch((err) => {
        console.error(err);
        setError(true);
      });

    if (dataChannels) {
      setChannels(dataChannels.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);
  return (
    <ChannelContext.Provider value={{ channels, loading, error }}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
