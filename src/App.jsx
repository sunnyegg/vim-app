import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import Home from './components/home/Home';
import List from './components/vtubers/List';
import Watch from './components/watch/Watch';

import ChannelContextProvider from './contexts/ChannelContext';
import StatisticsContextProvider from './contexts/StatisticsContext';
import VideoContextProvider from './contexts/VideoContext';

const App = () => {
  return (
    <Router>
      <div className="App">
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
            </VideoContextProvider>
          </StatisticsContextProvider>
        </ChannelContextProvider>
      </div>
    </Router>
  );
};

export default App;
