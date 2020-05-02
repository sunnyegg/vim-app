import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './components/home/Home';
import Watch from './components/watch/Watch';
import VtuberContextProvider from './contexts/VtuberContext';
import VideoContextProvider from './contexts/VideoContext';

const App = () => {
  return (
    <Router>
      <div className="App">
        <VtuberContextProvider>
          <VideoContextProvider>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            <Switch>
              <Route path="/watch" component={Watch} />
            </Switch>
          </VideoContextProvider>
        </VtuberContextProvider>
      </div>
    </Router>
  );
};

export default App;
