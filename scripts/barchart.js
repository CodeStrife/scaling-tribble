var t = 1297110663, // start time (seconds since epoch)
     v = 70, // start value (subscribers)
      data = d3.range(33).map(next); // starting dataset
  
  function next(a) {
    return {
      time: ++t,
      value: v = a
    };
  }
  
 function updateBarChart(a) {
   data.shift();
   data.push(next(a));
   redraw();
 }
 
 var w = 20,
      h = 80;
  
  var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);
 
  var y = d3.scale.linear()
      .domain([0, 100])
     .rangeRound([0, h]);
 
 var chart = d3.select("#lpm").append("svg")
     .attr("class", "chart")
     .attr("width", w * data.length - 1)
     .attr("height", h);
 
 chart.selectAll("rect")
     .data(data)
   .enter().append("rect")
     .attr("x", function(d, i) { return x(i) - .5; })
     .attr("y", function(d) { return h - y(d.value) - .5; })
     .attr("width", w)
     .attr("height", function(d) { return y(d.value); });
 
 chart.append("line")
     .attr("x1", 0)
     .attr("x2", w * data.length)
     .attr("y1", h - .5)
     .attr("y2", h - .5)
     .style("stroke", "#000");
        
function redraw() {
    var rect = chart.selectAll("rect")
        .data(data, function(d) { return d.time; });
  
    rect.enter().insert("rect", "line")
        .attr("x", function(d, i) { return x(i + 1) - .5; })
        .attr("y", function(d) { return h - y(d.value) - .5; })
        .attr("width", w)
       .attr("height", function(d) { return y(d.value); })
     .transition()
       .duration(1000)
       .attr("x", function(d, i) { return x(i) - .5; });
 
   rect.transition()
       .duration(1000)
       .attr("x", function(d, i) { return x(i) - .5; });
 
   rect.exit().transition()
       .duration(1000)
       .attr("x", function(d, i) { return x(i - 1) - .5; })
       .remove();
 
 }