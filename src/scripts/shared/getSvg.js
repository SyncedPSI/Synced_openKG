import * as d3 from 'd3v4';

export default () => {
  const svg = d3.select('svg');

  // zoom
  svg.call(d3.zoom()
    .scaleExtent([.5, 8])
    .on('zoom', zoom));

  function zoom() {
    d3.selectAll('.container').attr('transform', d3.event.transform);
  }

  return svg;
};
