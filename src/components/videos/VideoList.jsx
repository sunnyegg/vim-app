import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import './VideoList.style.css';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const VideoList = (props) => {
  const dateFormat = (date, type) => {
    if (!date) return null;
    if (type === 'live') {
      const today = dayjs();
      const schedule = dayjs(date);
      return today.to(schedule);
    } else {
      return dayjs(date).format('LLL');
    }
  };

  const iconPlaceholder =
    'https://via.placeholder.com/80x80.png?text=Loading...';
  const thumbnailPlaceholder =
    'https://via.placeholder.com/480x360.png?text=Loading...';
  const urlChannel = props.channelId
    ? `https://www.youtube.com/channel/${props.channelId}`
    : '';
  const urlVideo = props.id
    ? `https://www.youtube.com/watch?v=${props.id}`
    : '';

  return (
    <div className="card small video-list">
      <div className="card-image">
        <a href={urlVideo} target="_blank" rel="noopener noreferrer">
          <img
            src={props.thumbnail || thumbnailPlaceholder}
            alt="thumbnail"
            title={props.title}
          />
        </a>
        <span className="card-title tag blue darken-3">
          {props.agency || 'No Agency'}
        </span>
        {props.type === 'live' ? (
          <span className="btn-floating card-title status red white-text">
            Live
          </span>
        ) : (
          ''
        )}
      </div>
      <div className="card-action">
        <div className="card-action-header">
          <a
            href={urlChannel}
            target="_blank"
            rel="noopener noreferrer"
            title={props.channelName}
          >
            <img src={props.icon || iconPlaceholder} alt="" className="icon" />
          </a>
          <a
            href={urlVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title black-text"
            title={props.title}
          >
            <span>{props.title || ''}</span>
          </a>
        </div>
        <a
          href={urlChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="channel black-text"
          title={props.channelName}
        >
          <p>{props.channelName || ''}</p>
        </a>
        <p title={dateFormat(props.date, props.type) || ''}>
          {dateFormat(props.date, props.type) || ''}
        </p>
      </div>
    </div>
  );
};

export default VideoList;
