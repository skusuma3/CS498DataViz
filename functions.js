var width = 720;
var height = 405;
var dataset = []

function loadDataset() {
    
    d3.csv("data/kiva_mini.csv", function(data) {
        console.log(data[0]);
        dataset = data.map(function(d) { return [ +d["id"], +d["funded_amount"] ]; });
        console.log(dataset)
    });

}

function updateViz(data)
{
  // Note that global variables width and height are already defined.
  // There are also attributes with the names "width" and "height"
  // which you will set, but those are different values.

  // Given an array of data consisting of integers, use d3.js to do the following.

  // Select the SVG element by its ID.
  // Then use the general update pattern:
  // Join the data to any existing rect elements.
  // For each added element, append a rect element to the SVG.
  // For each deleted element, remove the old rect.
  document.getElementById("data").innerHTML=data;

  // There are enought html elements and here following Update Pattern
  d3.select("#list").selectAll("li").data([10, 20, 30, 25, 15])
    .text(function(d) { return d; })
    .enter().append("li")
    .text(function(d)  {return d;})
 
    d3.select("p")
        .datum(50)
        .text(function(d) { 
            return "Used existing paragraph element and the data " + d + " is assigned."; 
        });

    d3.select("div")
        .datum(100)
        .append("p")
        .text(function (d, i) {
            console.log(d); // the data element
            console.log(i); // the index element
            console.log(this); // the current DOM object
            return d;
            });

  var svg = d3.select("#decoy_viz")
                .selectAll("rect")
                .data(data);
    svg       
        .attr("width", "15")
        .attr("height", function (d) { return 10 *d;})
        .attr("x", function(d) { return d*20;})
        .attr("y", function(d) { return ( (height/2.0) - (5.0 * d) ); })
        .attr("tokenid", function(d,i) { return (d * i * 64); })
        .attr("fill", "steelblue ");
    
    svg.enter()
        .append("rect")
        .attr("width", "15")
        .attr("height", function (d) { return 10 *d;})
        .attr("x", function(d) { return d*20;})
        .attr("y", function(d) { return ( (height/2.0) - (5.0 * d) ); })
        .attr("tokenid", function(d,i) { return (d * i * 64); })
        .attr("fill", "steelblue ");

    svg.exit()
        .remove();

var svg1 = d3.select("#viz")
                .selectAll("rect")
                .data(data);
    svg1       
        .attr("width", "15")
        .attr("height", function (d) { return 10 *d;})
        .attr("x", function(d,i) { return i*20;})
        .attr("y", function(d) { return ( (height/2.0) - (5.0 * d) ); })
        .attr("tokenid", function(d,i) { return (d * i * 64); })
        .attr("fill", "steelblue ");
    
    svg1.enter()
        .append("rect")
        .attr("width", "15")
        .attr("height", function (d) { return 10 *d;})
        .attr("x", function(d,i) { return i*20;})
        .attr("y", function(d) { return ( (height/2.0) - (5.0 * d) ); })
        .attr("tokenid", function(d,i) { return (d * i * 64); })
        .attr("fill", "steelblue ");

    svg1.exit()
        .remove();

  // Each rect element should have the following properties
  // set as attributes:
  // "width" = 15
  // "height" = 10 * the datum value
  // "x" = index of the datum * 20
  // "y" = (global variable height / 2.0) - (5.0 * the datum value)
  // "tokenid" = (the datum value) * (the index of the datum) * 64
  // "fill" of "steelblue "
  // Note the extra space above! Sorry, this is a temporary bug.

  // Don't forget to update the existing rect elements!
  // That means you need to implement the general update pattern correctly.


}


function remove() {
    d3.selectAll("li")
        .data([10, 20, 30, 15])
        .exit()
        .remove()
    }
