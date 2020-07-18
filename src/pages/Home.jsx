// Packages
import React, { useContext, useRef, useCallback } from 'react';

// Components
import VideoList from '../components/videos/VideoList';
import Loadingbar from '../components/layout/Loadingbar';

// Contexts
import { VideoContext } from '../contexts/VideoContext';

// Other
import '../styles/main.scss';

const Home = () => {
  const {
    videos, loading, page, setPage, maxPage,
  } = useContext(VideoContext);

  // infinite scroll
  const observer = useRef();
  const lastItem = useCallback(
    (item) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      // jika user melihat item terakhir, lanjut page selanjutnya
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !maxPage) {
          setPage(page + 1);
        }
      });

      if (item) observer.current.observe(item);
    },
    [loading, page, setPage, maxPage],
  );

  return (
    <>
      {loading ? <Loadingbar /> : ''}

      {!videos.liveVideos.length ? localStorage.removeItem('watchlist') : ''}

      <div className="vim-container">
        <div className="vim-notification">
          <p>
            This is a development version. (v0.5)
            <br />
            Production version:
            {' '}
            <a
              href="https://vim.sunnyegg.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vtubers Indo Monitor
            </a>
            {' '}
            (v0.4)
          </p>
        </div>
        <div className="content">
          <h5>Currently Livestreaming</h5>
          <div className="content-video">
            {videos.liveVideos.length ? (
              videos.liveVideos.map((video) => (
                <VideoList
                  key={video.videoId}
                  id={video.videoId}
                  agency={video.agency}
                  channelId={video.channelId}
                  title={video.title}
                  channelName={video.channelName}
                  date={video.date}
                  thumbnail={video.thumbnail}
                  type={video.eventType}
                />
              ))
            ) : (
              <p>No Current Stream...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Upcoming</h5>
          <div className="content-video">
            {videos.upcomingVideos.length ? (
              videos.upcomingVideos.map((video) => (
                <VideoList
                  key={video.videoId}
                  id={video.videoId}
                  agency={video.agency}
                  channelId={video.channelId}
                  title={video.title}
                  channelName={video.channelName}
                  date={video.date}
                  thumbnail={video.thumbnail}
                  type={video.eventType}
                />
              ))
            ) : (
              <p>No Upcoming Videos...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Latest Uploads</h5>
          <div className="content-video">
            {videos.completedVideos.length ? (
              videos.completedVideos.map((video, index) => {
                if (videos.completedVideos.length === index + 1) {
                  return (
                    <VideoList
                      key={video.videoId}
                      id={video.videoId}
                      agency={video.agency}
                      channelId={video.channelId}
                      title={video.title}
                      channelName={video.channelName}
                      date={video.date}
                      thumbnail={video.thumbnail}
                      type={video.eventType}
                      lastItem={lastItem}
                    />
                  );
                }

                return (
                  <VideoList
                    key={video.videoId}
                    id={video.videoId}
                    agency={video.agency}
                    channelId={video.channelId}
                    title={video.title}
                    channelName={video.channelName}
                    date={video.date}
                    thumbnail={video.thumbnail}
                    type={video.eventType}
                  />
                );
              })
            ) : (
              <p>No Videos...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
