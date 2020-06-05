/* eslint-disable import/named */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import Home from './components/home/Home';
import List from './components/vtubers/List';
import Watch from './components/watch/Watch';
import Settings from './components/settings/Settings';

import ChannelContextProvider from './contexts/ChannelContext';
import StatisticsContextProvider from './contexts/StatisticsContext';
import VideoContextProvider from './contexts/VideoContext';
import WatchContextProvider from './contexts/WatchContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark'));
  if (darkMode === 'true') {
    document.body.style.backgroundColor = '#292929';
  } else {
    document.body.style.backgroundColor = 'white';
  }
  return (
    <Router>
      <div className={`App ${darkMode === 'true' ? 'dark' : ''}`}>
        <ChannelContextProvider>
          <StatisticsContextProvider>
            <VideoContextProvider>
              <WatchContextProvider>
                <Sidebar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/vtubers" component={List} />
                  <Route path="/watch" component={Watch} />
                  <Route
                    path="/settings"
                    component={() => <Settings setDark={setDarkMode} />}
                  />
                </Switch>
              </WatchContextProvider>
            </VideoContextProvider>
          </StatisticsContextProvider>
        </ChannelContextProvider>
      </div>
    </Router>
  );
};

export default App;
