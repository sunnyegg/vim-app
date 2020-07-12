import React, { useContext } from 'react';
import Loadingbar from '../layout/Loadingbar';
import Watchbar from './Watchbar';
import WatchList from './WatchList';
import { VideoContext } from '../../contexts/VideoContext';
import { WatchContext } from '../../contexts/WatchContext';
import './Watch.style.scss';

const Watch = () => {
  const { watchList } = useContext(WatchContext);
  const { videos, loading } = useContext(VideoContext);
  return (
    <>
      {loading ? <Loadingbar /> : ''}
      <Watchbar />
      <div className="watch">
        <div className="watch-content">
          {!loading && !videos.liveVideos.length ? (
            <p>No Live Videos...</p>
          ) : (
            ''
          )}
          {watchList.length
            ? watchList.map((video) => (
              <WatchList key={video.id} video={video} />
            ))
            : ''}
        </div>
      </div>
    </>
  );
};

export default Watch;
