import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import './CardList.style.scss';

const CardList = ({ data }) => (
  <div className="vtubers-cardlist">
    {data.map((vtuberdata) => (
      <div className="vtubers-cardlist-card" key={vtuberdata.id}>
        <LazyLoad>
          <img
            src={vtuberdata.channelIcon}
            className="vtubers-cardlist-card-image"
            alt={vtuberdata.channelName}
          />
        </LazyLoad>
        <div className="vtubers-cardlist-card-detail">
          <div className="vtubers-cardlist-card-title">
            {vtuberdata.channelName}
          </div>
          <div className="vtubers-cardlist-card-subtitle">Published Date</div>
          <div className="vtubers-cardlist-card-debut">
            {vtuberdata.publishDate}
          </div>
          <div className="vtubers-cardlist-card-subtitle">Subscribers</div>
          <div className="vtubers-cardlist-card-debut">
            {vtuberdata.subscriber}
          </div>
          <div className="vtubers-cardlist-card-subscribebuttoncontainer">
            <a
              href={`https://youtube.com/channel/${vtuberdata.id}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="vtubers-cardlist-card-subscribebutton"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
);

CardList.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default CardList;
