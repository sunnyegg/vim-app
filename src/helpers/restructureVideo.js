/* eslint-disable no-param-reassign */
import sort from './sortByDate';
import removeDuplicates from './removeDuplicates';

const restructure = (videoData = [], channelData = {}, type = '') => {
  const imgReg = /hqdefault.*/gm;
  const dateNow = new Date().toISOString();

  if (videoData.length) {
    videoData.forEach((item) => {
      if (item.channelId === channelData.id) {
        item.thumbnail = item.thumbnail.replace(imgReg, 'maxresdefault.jpg');
        item.channelIcon = channelData.channel.channelIcon;
        item.agency = channelData.agency;
        item.showChat = false;
      }

      if (item.eventType === 'upcoming' && dateNow >= item.date) {
        item.eventType = 'live';
      }
    });

    const filtered = videoData.filter((video) => video.eventType === type);
    return removeDuplicates(sort(filtered), 'videoId');
  }

  return [];
};

export default restructure;
