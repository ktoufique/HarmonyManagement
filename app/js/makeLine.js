console.time("Line");

var margin = {top: 30, right: 20, bottom: 30, left: 50},
width = 600 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
.orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
.orient("left").ticks(5);

var valueline = d3.svg.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.close); });

var valueline2 = d3.svg.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.closeBis); });


var svg = d3.select("p.One")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");




var data = [
{date:"01-May-12", close:"58.13", closeBis :"13.22"},
{date:"30-Apr-12", close:"53.98", closeBis :"23.22"},
{date:"27-Apr-12", close:"67.00", closeBis :"33.22"},
{date:"26-Apr-12", close:"89.70", closeBis :"73.22"},
{date:"25-Apr-12", close:"33.00", closeBis :"90.22"}
];

data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    d.closeBis = +d.closeBis;
});

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d){return Math.max(d.close, d.closeBis);})]);
        
        svg
        .append("g")
        .attr("class", "line1")
        .append("path") // Add the valueline path.
        .attr("d", valueline(data))
        .style("fill", "none");

        svg
        .append("g")
        .attr("class", "line2")
        .append("path") // Add the valueline path.
        .attr("d", valueline2(data))
        .attr("class", "line")
        .style("stroke", "red")
        .style("fill", "none")
        ;
        



        svg.append("g") // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        svg.append("g") // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);


        var tooltips = createTooltips(svg, data);
        removeLine(1, tooltips);
        removeLine(2, tooltips);


        function createTooltips (svg, data){
          
          var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

          var tooltips = new Array();

          var numberOfLines = Object.keys(data[0]).length - 1;

          for (i = 0; i < numberOfLines; i++){
            tooltips[i] = svg.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.date); })
        }

        tooltips[0].attr("cy", function(d) { return y(d.close); });
        tooltips[1].attr("cy", function(d) { return y(d.closeBis); });


        tooltips.forEach(function(d){
            var lineNumber = tooltips.indexOf(d);      
            d
            .on("mouseover", function(d) {
              div.transition()
              .duration(200)
              .style("opacity", .9);

              var valueString;

              switch(lineNumber)
              {
                case 0:
                valueString = d.close;
                break;
                case 1:
                valueString = d.closeBis;
                break;
                default:
                valueString = "Error !";

            }

            div.html("Value :<br>" + valueString)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
            .on("mouseout", 
              function(d) {
                div.transition()
                .duration(500)
                .style("opacity", 0);
            });
        })
        
        

        return tooltips;
    }
    
    
    function removeLine(number, tooltips){
      var group = "g.line" + number;

      var line = d3.select("p.One").select("g").select(group)
      .on("mousedown", function(d){
        line
        .transition()
        .duration(200)
        .style("opacity", .3)
        .remove();
        tooltips[number - 1]
        .transition()
        .duration(200)
        .style("opacity", .3)
        .remove();
    })

  }

  console.timeEnd("Line");



