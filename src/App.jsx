// Packages
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Watch from './pages/Watch';
import List from './pages/List';
import Settings from './pages/Settings';

// Components
import Sidebar from './components/layout/Sidebar';

// Contexts
import ChannelContextProvider from './contexts/ChannelContext';
import StatisticsContextProvider from './contexts/StatisticsContext';
import VideoContextProvider from './contexts/VideoContext';
import WatchContextProvider from './contexts/WatchContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark'));

  if (darkMode === 'true') {
    document.body.style.backgroundColor = '#292929';
  } else {
    document.body.style.backgroundColor = 'white';
  }

  return (
    <Router>
      <ScrollToTop />
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
