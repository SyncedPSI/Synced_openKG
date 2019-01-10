import * as d3 from 'd3v4';
export default ( { svg, simulation, nodes, link = null, keyword}) => {
  const color = d3.scaleOrdinal(['#9db88a', '#a888b3', '#7f90cf', '#c47074', '#c1bdd4', '#92afd9', '#d3c6a4', '#c38990']);
  const node = svg.append('g')
    .attr('class', 'node')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', function() {
      // if (d.id === main.id) return 50;
      return 30;
      // return parseInt(40 * Math.random(), 10);
    })
    .attr('fill', function (d) {
      return color(d.group);
    })
    .attr('pointer-events', 'all')
    .on('click', function (d) {
      if (d3.event.defaultPrevented) return;

      window.location.href = `/show.html?id=${d.id}&keyword=${keyword}`;
    })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  const text = svg.append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .attr('dy', 2)
    .attr('text-anchor', 'middle')
    .text(function (d) {
      return d.id;
    })
    .attr('fill', 'white');

  simulation
    .nodes(nodes)
    .on('tick', ticked);

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function ticked() {
    if (link) {
      link
        .attr('x1', function (d) {
          return d.source.x;
        })
        .attr('y1', function (d) {
          return d.source.y;
        })
        .attr('x2', function (d) {
          return d.target.x;
        })
        .attr('y2', function (d) {
          return d.target.y;
        });
    }
    node
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      });
    text
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y;
      });
  }
};
