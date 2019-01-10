import * as d3 from 'd3v4';
import getSvg from './shared/getSvg';
import getSimulation from './shared/getSimulation';
import drawNodes from './shared/drawNodes';
import input from './shared/input';

const draw = (nodes) => {
  const svg = getSvg();
  const simulation = getSimulation();

  // draw
  drawNodes(svg, simulation, nodes);
};

export default () => {
  input();

  d3.request('/graph.json')
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    })
    .get(function (error, res) {
      if (error) alert('出错啦');

      draw(res.nodes.slice(0, 20));
    });
};
