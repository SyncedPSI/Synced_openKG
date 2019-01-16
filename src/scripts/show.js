import * as d3 from 'd3v4';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';
import getUrlParams from './shared/url';
import { getNodeDetail } from './shared/api';

function flatten(root) {
  // hierarchical data to flat data for force layout
  var nodes = [];

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    nodes.push(node);
  }
  recurse(root);
  return nodes;
}

const draw = (nodes, links, keyword) => {
  const svg = getSvg();
  const simulation = getSimulation();

  // draw
  const link = svg.append('g')
    .attr('class', 'container')
    .selectAll('line')
    .data(links, function(d) {
      return d.target.id;
    })
    .enter().append('line')
    .attr('stroke-width', function (d) {
      return 1;
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

      const { children, desc, name } = res;
      document.title = `${name} | KG4AI`;
      document.getElementById('js-node-id').innerHTML = name;
      document.getElementById('js-node-desc').innerHTML = desc || '暂无描述';
      const root = d3.hierarchy(res);
      const nodes = flatten(root);
      const links = root.links();

      draw(nodes, links, keyword);
    });
};
