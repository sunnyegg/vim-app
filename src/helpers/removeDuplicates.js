const filterData = (data = []) => {
  return [...new Set(data)];
};

export default filterData;
