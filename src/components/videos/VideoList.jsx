import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "./VideoList.style.css";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const VideoList = (props) => {
  const dateFormat = (date, type) => {
    if (!date) return null;
    if (type === "live") {
      const today = dayjs();
      const schedule = dayjs(date);
      return today.to(schedule);
    } else {
      return dayjs(date).format("LLL");
    }
  };

  const thumbnailPlaceholder =
    "https://via.placeholder.com/480x360.png?text=Loading...";
  const urlChannel = props.channelId
    ? `https://www.youtube.com/channel/${props.channelId}`
    : "";
  const urlVideo = props.id
    ? `https://www.youtube.com/watch?v=${props.id}`
    : "";

  return (
    <div
      className={
        props.type === "live"
          ? "card small video-list animation-pulse"
          : "card small video-list"
      }
    >
      <div className="card-image">
        {props.type === "live" ? (
          <Link to="/watch" title={props.title}>
            <img
              src={props.thumbnail || thumbnailPlaceholder}
              alt="thumbnail"
            />
          </Link>
        ) : (
          <a
            href={urlVideo}
            target="_blank"
            rel="noopener noreferrer"
            title={props.title}
          >
            <img
              src={props.thumbnail || thumbnailPlaceholder}
              alt="thumbnail"
            />
          </a>
        )}

        <span
          className={`card-title tag ${props.agency || "indie"}`}
        >
          {props.agency || "No Agency"}
        </span>
      </div>
      <div className="card-action">
        <div className="card-action-header">
          {props.type === "live" ? (
            <Link
              to="/watch"
              className="card-title black-text"
              title={props.title}
            >
              <span>{props.title || ""}</span>
            </Link>
          ) : (
            <a
              href={urlVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-title black-text"
              title={props.title}
            >
              <span>{props.title || ""}</span>
            </a>
          )}
        </div>
        <a
          href={urlChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="channel black-text"
          title={props.channelName}
        >
          <p>{props.channelName || ""}</p>
        </a>
        <p title={dateFormat(props.date, props.type) || ""}>
          {dateFormat(props.date, props.type) || ""}
        </p>
      </div>
    </div>
  );
};

export default VideoList;
