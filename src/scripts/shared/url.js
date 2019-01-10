export default () => {
  const query = window.location.search.slice(1);
  const urlObj = {};
  query.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    urlObj[key] = value;
  });

  return urlObj;
};
