export default () => {
  const input = document.getElementById('js-input');
  const search = document.getElementById('js-go-search');
  const close = document.getElementById('js-close-search');

  const goSearch = () => {
    const value = input.value;
    if (!value) return;

    window.location.href = `/search.html?keyword=${value}`;
  };

  input.addEventListener('input', function() {
    let className = 'search--icon';
    if (this.value === '') {
      className += ' t-hidden';
    }

    close.setAttribute('class', className);
  });

  input.addEventListener('keydown', function (event) {
    if (event.which === 13) {
      goSearch();
    }
  });


  close.addEventListener('click', () => {
    input.value = '';

    close.setAttribute('class', 'search--icon t-hidden');
  });

  search.addEventListener('click', function () {
    goSearch();
  });
};
