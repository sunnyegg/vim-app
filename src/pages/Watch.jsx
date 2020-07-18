// Packages
import React, { useContext } from 'react';

// Components
import Loadingbar from '../components/layout/Loadingbar';
import Watchbar from '../components/watch/Watchbar';
import WatchList from '../components/watch/WatchList';

// Contexts
import { VideoContext } from '../contexts/VideoContext';
import { WatchContext } from '../contexts/WatchContext';

// Other
import '../styles/main.scss';

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
