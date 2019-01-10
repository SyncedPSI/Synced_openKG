export default () => {
  const input = document.getElementById('js-input');
  const search = document.getElementById('js-go-search');

  search.addEventListener('click', function () {
    const value = input.value;
    if (!value) return;

    window.location.href = `/search.html?keyword=${value}`;
  });
};
