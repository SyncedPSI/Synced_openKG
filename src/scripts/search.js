import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';
import input from './shared/input';
import getUrlParams from './shared/url';
import { searchByKeyword } from './shared/api';

const draw = (nodes, keyword) => {
  const svg = getSvg();
  const simulation = getSimulation();

  // draw
  drawNodes({svg, simulation, nodes, keyword});
};

export default () => {
  input();
  let { keyword } = getUrlParams();
  if (!keyword) {
    document.getElementById('js-sidebar-item').innerHTML = '<span class="sidebar--item">请输入关键字</span>';
    return;
  }

  keyword = decodeURI(keyword);
  document.title = `搜索「${keyword}」| KG4AI`;
  document.getElementById('js-input').setAttribute('value', keyword);


  searchByKeyword(keyword)
    .get(function (error, res) {
      if (error) alert('出错啦');

      if (res.length === 0) {
        document.getElementById('js-sidebar-item').innerHTML = '<div class="sidebar--loading">未找到相关数据</div>';
        return;
      }

      let html = '';
      res.forEach((item) => {
        html += `<a class="sidebar--item" href='/show.html?id=${item.id}&keyword=${keyword}'>${item.name}</a>`;
      });

      document.getElementById('js-sidebar-item').innerHTML = html;
      draw(res, keyword);
    });
};
