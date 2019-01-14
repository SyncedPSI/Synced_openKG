import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';
import getUrlParams from './shared/url';
import { getNodeDetail } from './shared/api';

const draw = (nodes, links, keyword) => {
  const svg = getSvg();
  const simulation = getSimulation();

  // draw
  const link = svg.append('g')
    .attr('class', 'link')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke-width', function (d) {
      return Math.sqrt(d.value);
    })
    .attr('stroke', '#fff');
  drawNodes({ svg, simulation, nodes, link, keyword });

  simulation.force('link')
    .links(links);
};

export default () => {
  const { keyword, id } = getUrlParams();

  document.getElementById('js-go-prev').addEventListener('click', () => {
    window.location.href = `/search.html?keyword=${keyword}`;
  });

  getNodeDetail(id)
    .get(function (error, res) {
      if (error) alert('出错啦');

      const { links, nodes } = res;
      const nodeTitleEle = document.getElementById('js-node-id');
      nodeTitleEle.innerHTML = '主题的名字';

      draw(nodes, links, keyword);
    });
};
