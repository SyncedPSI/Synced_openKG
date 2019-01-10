import index from './index';
import search from './search';
import show from './show';

const app = () => {
  const currentPage = document.body.getAttribute('id');
  const allActions = {
    index,
    show,
    search
  };
  allActions[currentPage]();
};

app();
