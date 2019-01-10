import * as d3 from 'd3v4';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';
import input from './shared/input';
import getUrlParams from './shared/url';

const draw = (nodes) => {
  const svg = getSvg();
  const simulation = getSimulation();

  // draw
  drawNodes(svg, simulation, nodes);
};

export default () => {
  input();
  const { keyword } = getUrlParams();
  document.getElementById('js-input').setAttribute('value', keyword);

  d3.request('/graph.json')
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    })
    .get(function (error, res) {
      if (error) alert('出错啦');

      // only show first 20 nodes
      const nodes = res.nodes.slice(0, 20);
      let html = '';
      nodes.forEach((item) => {
        html += `<a class="sidebar--item" href='/show.html?id=${item.id}&keyword=${keyword}'>${item.id}</a>`;
      });

      document.getElementById('js-sidebar-item').innerHTML = html;
      draw(nodes);
    });
};
