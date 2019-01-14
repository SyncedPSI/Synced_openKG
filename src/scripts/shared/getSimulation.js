
import * as d3 from 'd3v4';
export default () => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) {
      return d.id;
    }))
    .force('charge', d3.forceManyBody())
    .force('collide', d3.forceCollide(60))
    .force('center', d3.forceCenter(width / 2, height / 2));

  return simulation;
};
