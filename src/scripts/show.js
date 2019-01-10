import * as d3 from 'd3v4';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';

const draw = (graph) => {
  const svg = getSvg();
  const simulation = getSimulation();
  const color = d3.scaleOrdinal(d3.schemeCategory20);

  // draw
  const link = svg.append('g')
    .attr('class', 'link')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
    .attr('stroke-width', function (d) {
      return Math.sqrt(d.value);
    })
    .attr('stroke', function (d) {
      return color(d.value);
    });
  drawNodes(svg, simulation, graph.nodes, link);

  simulation.force('link')
    .links(graph.links);
};

export default () => {

  d3.request('/graph.json')
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    })
    .get(function (error, res) {
      if (error) alert('出错啦');

      draw(res);
    });
};
