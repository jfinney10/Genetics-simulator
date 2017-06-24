//http://bl.ocks.org/mbostock/2368837

function parseFamily(family) {

}

function CreateTimeline(data) {
  var margin = { top: 20, right: 30, bottom: 40, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

	/*var x = d3.scale.linear()
    .range([-10, width]);
  */

  var x = d3.scale.linear()
    //.domain([-10, 105])
    .domain([
    0, //d3.min(data, function (d) { return d.birthYear; }),
    110 //d3.max(data, function (d) { return d.ageAtDeath; })
    ])
    .range([0, width])
    .nice();

  var y = d3.scale.linear()
    .domain ([0,5])
    .range([0, height])
    .nice();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

  var svg = d3.select("body").append("svg")
    .attr('id', 'newTimeline')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var minYear = d3.min(data, function (d) {
    return d.birthYear;
  });
  
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", function (d) {
      return "bar bar--" + (d.sex === 'Male' ? "male" : "female");
    })
    .attr("x", function (d) {
      var rv = x(d.birthYear);
      //console.log('d.birthYear:', d.birthYear);
      //console.log('x rv:', rv);
      return rv;
    })
    .attr("y", function (d, i) {
      var rv = y(i);
      //console.log('i:', i);
      //console.log('y rv:', rv);
      return rv;
    })
    .attr("width", function (d) {
      var rv = x(d.ageAtDeath);
      //console.log('width val:', d.ageAtDeath);
      //console.log('width rv:', rv);
      return rv;
    })
    .attr("height", 20);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .call(yAxis);

  function type(d) {
    d.value = +d.value;
    return d;
  }
}

console.log('timeline.js loaded');