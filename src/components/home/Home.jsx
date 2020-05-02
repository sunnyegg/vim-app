import React, { useState, useEffect, useContext } from 'react';
import VideoList from '../videos/VideoList';
import Loadingbar from '../layout/Loadingbar';
import { VideoContext } from '../../contexts/VideoContext';
import './Home.style.css';

const Home = () => {
  const { videos } = useContext(VideoContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videos) {
      setLoading((loading) => !loading);
    }
  }, [videos]);

  return (
    <>
      {loading ? <Loadingbar /> : ''}
      <div className="home">
        <div className="content">
          <h5>Live</h5>
          <div className="content-video">
            {loading ? (
              ''
            ) : videos?.liveVideos.length ? (
              videos?.liveVideos.map((video) => {
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
            ) : (
              <p>No videos...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Upcoming</h5>
          <div className="content-video">
            {loading ? (
              ''
            ) : videos?.upcomingVideos.length ? (
              videos?.upcomingVideos.map((video) => {
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
            ) : (
              <p>No videos...</p>
            )}
          </div>
        </div>
        <div className="content">
          <h5>Latest Uploads</h5>
          <div className="content-video">
            {loading ? (
              ''
            ) : videos?.completedVideos.length ? (
              videos?.completedVideos.map((video) => {
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
