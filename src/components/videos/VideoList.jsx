// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

// Other
import '../../styles/components.scss';

// Init
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const VideoList = ({
  id,
  agency,
  channelId,
  title,
  channelName,
  date,
  thumbnail,
  type,
  lastItem,
}) => {
  const dateFormat = (inputDate, inputType) => {
    if (!inputDate) return null;
    if (inputType === 'live') {
      const today = dayjs();
      const schedule = dayjs(inputDate);
      return today.to(schedule);
    }

    return dayjs(inputDate).format('LLL');
  };

  const urlChannel = channelId
    ? `https://www.youtube.com/channel/${channelId}`
    : '';
  const urlVideo = id ? `https://www.youtube.com/watch?v=${id}` : '';

  return (
    <div
      ref={lastItem}
      className={
        type === 'live'
          ? 'card small video-list animation-pulse'
          : 'card small video-list'
      }
    >
      <div className="card-image">
        {type === 'live' ? (
          <Link to="/watch" title={title}>
            <LazyLoad>
              <img src={thumbnail} alt="thumbnail" />
            </LazyLoad>
          </Link>
        ) : (
          <a
            href={urlVideo}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
          >
            <LazyLoad>
              <img src={thumbnail} alt="thumbnail" />
            </LazyLoad>
          </a>
        )}

        <span className={`card-title tag ${agency}`}>
          {agency.charAt(0).toUpperCase() + agency.slice(1)}
        </span>
      </div>
      <div className="card-action">
        <div className="card-action-header">
          {type === 'live' ? (
            <Link to="/watch" className="card-title black-text" title={title}>
              <span>{title || ''}</span>
            </Link>
          ) : (
            <a
              href={urlVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-title black-text"
              title={title}
            >
              <span>{title || ''}</span>
            </a>
          )}
        </div>
        <a
          href={urlChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="channel black-text"
          title={channelName}
        >
          <p>{channelName || ''}</p>
        </a>
        <p title={dateFormat(date, type) || ''}>
          {dateFormat(date, type) || ''}
        </p>
      </div>
    </div>
  );
};

VideoList.propTypes = {
  id: PropTypes.string.isRequired,
  agency: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  lastItem: PropTypes.func,
};

VideoList.defaultProps = {
  lastItem: undefined,
};

export default VideoList;
