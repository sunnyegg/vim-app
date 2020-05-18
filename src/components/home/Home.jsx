import React, { useContext, useRef, useCallback } from 'react';
import VideoList from '../videos/VideoList';
import Loadingbar from '../layout/Loadingbar';
import { VideoContext } from '../../contexts/VideoContext';
import './Home.style.scss';

const Home = () => {
  const { videos, loading, page, setPage, maxPage } = useContext(VideoContext);

  const observer = useRef();
  const lastItem = useCallback(
    (item) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !maxPage) {
          setPage(page + 1);
        }
      });

      if (item) observer.current.observe(item);
    },
    [loading, page, setPage, maxPage]
  );

  return (
    <>
      {loading ? <Loadingbar /> : ''}
      {!videos?.liveVideos?.length ? localStorage.removeItem('watchlist') : ''}
      <div className="vim-container">
        <div className="content">
          <h5>Currently Livestreaming</h5>
          <div className="content-video">
            {videos?.liveVideos?.length ? (
              videos?.liveVideos?.map((video) => {
                return (
                  <VideoList
                    key={video.videoId}
                    id={video.videoId}
                    agency={video.agency}
                    channelId={video.channelId}
                    title={video.title}
                    channelName={video.channelName}
                    date={video.date}
                    icon={video.channelIcon}
                    thumbnail={video.thumbnail}
                    type={video.eventType}
                  />
                );
              })
            ) : loading ? (
              ''
            ) : (
              <p>No Current Stream...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Upcoming</h5>
          <div className="content-video">
            {videos?.upcomingVideos?.length ? (
              videos?.upcomingVideos?.map((video) => {
                return (
                  <VideoList
                    key={video.videoId}
                    id={video.videoId}
                    agency={video.agency}
                    channelId={video.channelId}
                    title={video.title}
                    channelName={video.channelName}
                    date={video.date}
                    icon={video.channelIcon}
                    thumbnail={video.thumbnail}
                    type={video.eventType}
                  />
                );
              })
            ) : loading ? (
              ''
            ) : (
              <p>No Upcoming Stream...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Latest Uploads</h5>
          <div className="content-video">
            {videos?.completedVideos?.length ? (
              videos?.completedVideos?.map((video, index) => {
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
                      icon={video.channelIcon}
                      thumbnail={video.thumbnail}
                      type={video.eventType}
                      lastItem={lastItem}
                    />
                  );
                } else {
                  return (
                    <VideoList
                      key={video.videoId}
                      id={video.videoId}
                      agency={video.agency}
                      channelId={video.channelId}
                      title={video.title}
                      channelName={video.channelName}
                      date={video.date}
                      icon={video.channelIcon}
                      thumbnail={video.thumbnail}
                      type={video.eventType}
                    />
                  );
                }
              })
            ) : loading ? (
              ''
            ) : (
              <p>No videos...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
