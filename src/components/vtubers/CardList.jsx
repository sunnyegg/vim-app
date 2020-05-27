import React from 'react';
import './CardList.style.scss';

const Table = ({ data }) => {
  return (
    <div className="vtubers-cardlist">
      {data.map((vtuberdata, index) => (
        <div className="vtubers-cardlist-card" key={index}>
          <img
            src={vtuberdata.channelIcon}
            className="vtubers-cardlist-card-image"
            alt={vtuberdata.channelName}
          />
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
};

export default Table;
