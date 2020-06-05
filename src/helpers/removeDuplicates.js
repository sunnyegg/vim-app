/* eslint-disable arrow-body-style */
const filterData = (data = []) => {
  return data.filter((val, idx, self) => {
    return self.findIndex((item) => item.videoId === val.videoId) === idx;
  });
};

export default filterData;
