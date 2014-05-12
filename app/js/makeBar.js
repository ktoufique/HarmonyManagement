console.time("Bar: Making bigData");



var data = [{ "date" : "2013-1", "value" : "53"},
{ "date" : "2013-2", "value" : "165"}];

var value = 1;
var end = 15;
var bigData = new Array();

for (var i = 0; i < end; i++){
	year = 2013 + i;
	year = year + "-" + "2";
	value = i*i + 1;
	bigData[i] = { "date": year, "value": value };
}
console.timeEnd("Bar: Making bigData");

console.time("Bar: Making Chart");

var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 600 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m").parse;
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bo²ttom")
.tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(10);

var svg = d3.select("p.Three").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
	"translate(" + margin.left + "," + margin.top + ")");
data = bigData;




data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.value = +d.value;
});

x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", "-.55em")
.attr("transform", "rotate(90) translate(70, 0)" );

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Value ($)");

svg.selectAll("bar")
.data(data)
.enter().append("rect")
.style("fill", "steelblue")
.attr("x", function(d) { return x(d.date); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.value); })
.attr("height", function(d) { return height - y(d.value); });

console.timeEnd("Bar: Making Chart");

svg
.on("mousedown", flash("Hello", "0"))
.on("mouseleave", flash("bye","1em"));

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