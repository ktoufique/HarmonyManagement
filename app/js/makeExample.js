var width = 960,
height = 500;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
.call(nest, 6, 30)
.on("mouseenter", flash("mouseenter", "-1em"))
.on("mouseover", flash("mouseover", "0"))
.on("mouseout", flash("mouseout", "1em"))
.on("mouseleave", flash("mouseleave", "2em"));

function flash(name, dy) {
  return function() {
    d3.select(this).append("text")
    .attr("class", name)
    .attr("transform", "translate(" + d3.mouse(this) + ")")
    .attr("dy", dy)
    .text(name)
    .transition()
    .duration(1500)
    .style("opacity", 0)
    .remove();
  };
}

function nest(svg, levels, step) {
  var g = svg.append("g");

  g.append("rect")
  .attr("x", -(levels + 1) * step)
  .attr("y", -(levels + 1) * step)
  .attr("width", (levels + 1) * step * 2)
  .attr("height", (levels + 1) * step * 2);

  if (levels > 0) g.call(nest, levels - 1, step);
}



