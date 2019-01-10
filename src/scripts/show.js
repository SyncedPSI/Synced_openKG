import * as d3 from 'd3v4';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';import getUrlParams from './shared/url';

const draw = (nodes, links) => {
  const svg = getSvg();
  const simulation = getSimulation();
  const color = d3.scaleOrdinal(d3.schemeCategory20);

  // draw
  const link = svg.append('g')
    .attr('class', 'link')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke-width', function (d) {
      return Math.sqrt(d.value);
    })
    .attr('stroke', function (d) {
      return color(d.value);
    });
  drawNodes(svg, simulation, nodes, link);

  simulation.force('link')
    .links(links);
};

export default () => {
  const { keyword, id } = getUrlParams();

  document.getElementById('js-go-prev').addEventListener('click', () => {
    window.location.href = `/search.html?keyword=${keyword}`;
  });

  d3.request(`/graph.json?id=${id}`)
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    })
    .get(function (error, res) {
      if (error) alert('出错啦');

      const { links, nodes } = res;
      const nodeTitleEle = document.getElementById('js-node-id');
      nodeTitleEle.innerHTML = '主题的名字';

      draw(nodes, links);
    });
};
