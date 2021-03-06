import * as d3 from 'd3v4';

export default ( { svg, simulation, nodes, link = null, keyword}) => {
  const labelColor = {
    'Technology': '#9db88a',
    'Expert' : '#a888b3',
    'Venue' : '#7f90cf',
    'Institution': '#c47074',
    'Paper' : '#c1bdd4',
    'Solution' : '#92afd9',
    'Resource' : '#d3c6a4',
    'BusinessCase' : '#c38990',
  };

  const circleRadius = {
    0: 60,
    1: 30,
    2: 20
  };

  const node = svg.append('g')
    .attr('class', 'container')
    .selectAll('node')
    .data(nodes)
    .enter()
    .append('g');

  node.append('circle')
    .attr('r', function (d) {
      const radius = circleRadius[d.depth];
      return (radius || 30);
    })
    .attr('fill', function (d) {
      const type = d.label || d.data.label;

      return labelColor[type];
    })
    .attr('pointer-events', 'all')
    .on('click', function (d) {
      if (d3.event.defaultPrevented) return;
      const id = d.id || d.data.id;
      window.location.href = `/show.html?id=${id}&keyword=${keyword}`;
    })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  node.each(function(item) {
    const currentText = d3.select(this);
    const name = item.name || item.data.name;
    const words = name.split(' ').reverse();
    let word = '';
    let line = [];
    let lineNumber = 0;
    let lineHeight = 1;
    let text = currentText.append('text').attr('text-anchor', 'middle').attr('fill', 'white').attr('font-size', 12).attr('dy', 0);
    while (word = words.pop()) {
      line.push(word);
      text.text(line.join(' '));
      if (text.node().getComputedTextLength() > 60) {
        if (lineNumber >= 2) {
          return;
        }
        line.pop();
        text.text(line.join(' '));
        if (line.length === 0) lineNumber--;
        line = [word];
        text = currentText.append('text').attr('text-anchor', 'middle').attr('fill', 'white').attr('font-size', 12).attr('dy', ++lineNumber * lineHeight + 'em').text(word);
      }
    }
  });

  // node.append('text')
  //   .attr('dy', 2)
  //   .attr('text-anchor', 'middle')
  //   .text(function (d) {
  //     return d.name;
  //   })
  //   .attr('fill', 'white')
  //   .call(wrap, 60);

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
    node.attr('transform', function (d) {
      return 'translate(' + [d.x, d.y] + ')';
    });
  }
};
