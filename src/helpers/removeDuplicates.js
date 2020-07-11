/* eslint-disable arrow-body-style */
const filterData = (data = [], key) => {
  return data.filter((val, idx, self) => {
    return self.findIndex((item) => item[key] === val[key]) === idx;
  });
};

export default filterData;
