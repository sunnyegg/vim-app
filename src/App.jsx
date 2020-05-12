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
              <Sidebar />
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
              <Switch>
                <Route path="/vtubers" component={List} />
              </Switch>
              <Switch>
                <Route path="/watch" component={Watch} />
              </Switch>
              <Switch>
                <Route
                  path="/settings"
                  component={() => <Settings setDark={setDarkMode} />}
                />
              </Switch>
            </VideoContextProvider>
          </StatisticsContextProvider>
        </ChannelContextProvider>
      </div>
    </Router>
  );
};

export default App;
