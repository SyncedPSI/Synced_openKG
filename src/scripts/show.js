import * as d3 from 'd3v4';
import graph from './graph';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';

export default () => {
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
