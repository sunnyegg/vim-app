const sort = (item) => item.sort((a, b) => {
  if (a.eventType === 'upcoming') {
    return new Date(a.date) - new Date(b.date);
  }

  return new Date(b.date) - new Date(a.date);
});

export default sort;
