new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    //slidesNavigation:false,
    //navigation:false,
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE"
});

//methods
//fullpage_api.setAllowScrolling(false);


 //Loading Data
 
var parseTime = d3.timeParse("%Y-%b");

var formatNumber = d3.format(".2f"),
    formatMillion = function(x) { return formatNumber(x / 1e6) + "M"; };


var sectorLabels = ["Agriculture","Food","Retail","Services","Clothing","Education","Housing","Personal Use","Arts","Transportation","Health","Construction", "Manufacturing", "Entertainment", "Wholesale"];
var countryColors = ["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9", "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", "#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", "#678275", "#c5a121", "#a978ba", "#ee534e", "#d24506", "#59c3fa", "#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", "#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf", "#d77cd1", "#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", "#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", "#bb59d8", "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", "#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0"];


function hideAllCharts(){
d3.selectAll("svg")
    .style("display", "none");

//d3.select("#svgChart1_1").style("display", "none");
//d3.select("#svgChart1_2").style("display", "none");
/*
eles = document.getElementsByClassName("svgChart");

for(var i=0;i< eles.length; i++) {
    var element = document.getElementById(eles[i]);
    element.style.display = "none";
}*/

}


function drawChart3_1() {

hideAllCharts();
//d3.select("#divChart1").style("display", "block");
d3.select("#svgChart3_1").style("display", "block");

var bisectDate = d3.bisector(function(d) { return d.date; }).left;

var svg = d3.select("#svgChart3_1"),
    margin = {top: 60, right: 100, bottom: 60, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
        .attr("class", "request")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 //d3.select("#svgChart3_1").attr("align","center"); 
//svg.attr("transform", "translate(" + width/2 + "," + height + ")");

//svg.style("display","block");
// Add the clip path.
svg.append("clipPath")
  .attr("id", "clip")
.append("rect")
  .attr("width", width)
  .attr("height", height);


var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

var area = d3.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d.funding_amount); });

d3.csv("data/funding_byMonth_consolidated.csv", function(error, data) {
    //color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.funding_amount = +d.funding_amount;
    });

x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.funding_amount; })+1e6]);
//breating space for y-axes helps to write more scale

area.y0(y(0));

g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
.selectAll("text")
    .attr("y", 10)
    .attr("x", -10)
    .attr("dy", ".35em")
    //.attr("transform", "rotate(90)")
    .style("text-anchor", "start");
    //.style("fill", function(i) { return color(i); });

g.append("text")             
    .attr("transform",
    "translate(" + (width/2) + " ," + 
                    (height + margin.top ) + ")")
    .style("text-anchor", "middle")
    .attr("class", "label")
    .text("Date");

g.append("g")
  .attr("class", "axis")
  .call(yAxis .ticks(20, "s"));

g.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+45)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "label")
  .style("text-anchor", "middle")
  .text("Funding Amount in Millions($)");

g.append("path")
    .datum(data)
    .attr("fill", "steelblue")
    .attr("class", "area")
    .attr("d", area);

//g.append("g")
//    .attr("transform", "translate(0," + height + ")")
//    .call(d3.axisBottom(x));

// text label for the x axis
/*
g.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                       (height + margin.top + 50) + ")")
  .style("text-anchor", "start")
  .attr("class", "label")
  .text("Quarters");
*/
/*  g.append("g")
    .call(d3.axisLeft(y) .ticks(20, "s"))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    //.attr("y", 6)
    //.attr("dy", "0.71em")
    //.attr("text-anchor", "end")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Funding Amount in Millions($)");
*/
    var focus = g.append("g")
    .attr("class", "focus")
    .style("display", "none");

focus.append("line")
    .attr("class", "x-hover-line hover-line")
    .attr("y1", 0)
    .attr("y2", height);

focus.append("line")
    .attr("class", "y-hover-line hover-line")
    .attr("x1", width)
    .attr("x2", width);

focus.append("circle")
    .attr("r", 7.5);

focus.append("text")
    .attr("x", 15)
      .attr("dy", ".31em");

svg.append("rect")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

function mousemove() {
  var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  focus.attr("transform", "translate(" + x(d.date) + "," + y(d.funding_amount) + ")");
  focus.select("text").text(function() { return d3.format(".2f")(d.funding_amount/1e6) + "M"; });
  focus.select(".x-hover-line").attr("y2", height - y(d.funding_amount));
  focus.select(".y-hover-line").attr("x2", width + width);
}

 //Each Highs 
/* var anot1 = g.append("text")
    .attr("x", x(parseTime("2014-Oct")))
    .attr("y", y(13046885)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot1.append("tspan")
    .attr("x",  x(parseTime("2014-Oct")))
    .attr("dy","1.0em")
    .text("2014 Oct. Peak");
    
    anot1.append("tspan")
    .attr("x",  x(parseTime("2014-Oct")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(13046885/1e6) + "M ($ 13046885)" ); */

var anot2 = g.append("text")
    .attr("x", x(parseTime("2015-Mar")))
    .attr("y", y(13458425)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot2.append("tspan")
    .attr("x",  x(parseTime("2015-Mar")))
    .attr("dy","1.0em")
    .text("2015 Mar Peak");
    
    anot2.append("tspan")
    .attr("x",  x(parseTime("2015-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(13458425/1e6) + "M ($ 13458425)" );

var anot3 = g.append("text")
    .attr("x", x(parseTime("2016-Mar")))
    .attr("y", y(14194975)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot3.append("tspan")
    .attr("x",  x(parseTime("2016-Mar")))
    .attr("dy","1.0em")
    .text("2016 Mar Peak");
    
    anot3.append("tspan")
    .attr("x",  x(parseTime("2016-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(14194975/1e6) + "M ($ 14194975)" );

var anot4 = g.append("text")
    .attr("x", x(parseTime("2017-Mar")))
    .attr("y", y(16472800)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot4.append("tspan")
    .attr("x",  x(parseTime("2017-Mar")))
    .attr("dy","1.0em")
    .text("2016 Mar Peak");
    
    anot4.append("tspan")
    .attr("x",  x(parseTime("2017-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(16472800/1e6) + "M ($ 16472800)" );

    //Scatter Plot for dots
    g.append("g")
        .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class","dot")
            .attr("r", 2)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.funding_amount); });

d3.select("#svgChart3_1").style("display", "block");

});

}  // End of svgChart1


function drawChart3_2() {

hideAllCharts();

d3.select("#svgChart3_2").style("display", "block");

var parseDate = d3.timeParse("%Y-%b");

var parseTime = d3.timeParse("%Y-%b");
//parseTime("June 30, 2015");

var formatTime = d3.timeFormat("%B %d, %Y");
    //formatTime(new Date); // "June 30, 2015"

//var formatNumber = d3.format(".2f"),
//    formatMillion = function(x) { return formatNumber(x / 1e6) + "M"; };

var svg = d3.select("#svgChart3_2"),
    margin = {top: 60, right: 20, bottom: 60, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
        .attr("class", "request")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var tsvData = null;

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(formatMillion);

var area = d3.area()
    .x(function(d) { 
    return x(d.data.date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var stack = d3.stack()

var div = d3.select("body")
    .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

//Draw the Legend
var legend = document.getElementById("legend3_2");
var newString = "";
//<div class="legend2"> <p class="country-name"><span class="key-dot"></span>Agriculture</p> </div>
for(var i=0; i< sectorLabels.length; i++) {
    newString += '<div class="legend2"><span class="key-dot" style="background:' + color(sectorLabels[i]) + '"></span>' + sectorLabels[i] + '</div>';
}

document.getElementById("legend3_2").innerHTML = newString;


d3.csv('data/funding_byMonth_bySector.csv', function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
    var keys = data.columns.filter(function(key) { return key !== 'date'; })
    data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

tsvData = (function(){ return data; })();

var maxDateVal = d3.max(data, function(d){
    var vals = d3.keys(d).map(function(key){ return key !== 'date' ? d[key] : 0 });
    return d3.sum(vals);
});

// Set domains for axes
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, maxDateVal])

stack.keys(keys);

stack.order(d3.stackOrderNone);
stack.offset(d3.stackOffsetNone);

//console.log(stack(data));

var sector = g.selectAll('.sector')
    .data(stack(data))
    .enter()
    .append('g')
    .attr('class', function(d){ return 'sector ' + d.key; })
    //.attr('tagName', function(d){ return 'sector ' + d.key; })
    .attr('fill-opacity', 0.8);

sector.append('path')
  .attr('class', 'area')
  .attr('d', area)
  .style('fill', function(d) { return color(d.key); })
  .on("mousemove", function(d,i, object) {
    //console.log(d);
    //console.log("<b>Date:</b>" + d[0].data.date + "<br/><b>Sector:</b>" + d.key + "<br/><b>Funding:</b>" + d[0].data[d.key]);
    var xPosition = d3.mouse(this)[0] - 5;
    var yPosition = d3.mouse(this)[1] - 5;
    //tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    //tooltip.select("text").text(d[1]-d[0]);
    //console.log(xPosition + "," + yPosition);
    //console.log(x.bandwidth())

    var tickWidth = width/(x.ticks().length);
    //var xContext = Math.ceil(xPosition/tickWidth) 
    var xContext = Math.floor(xPosition/(tickWidth/3)); //since each tickwidth consists of 3 months
    
    var getdDate = function(d1) {
        if(d1 != undefined && d1 != "undefined") {
            return formatTime(d1.data.date);
        }
    }

    var dDate = getdDate(d[xContext]);
    if(dDate == null ) return;

    //var dDate = x.ticks()[xContext <0 ? 0 : xContext]
    var sectorFundValue = d[xContext].data[d.key];
    var allKeysValue = d[xContext][1]; //sum of all columns 

    div.transition()        
            .duration(200)      
            .style("opacity", 1);      
        div .html("<b>Date:</b>" + dDate + "<br/><b>Sector:</b>" + d.key + "<br/><b>Total Fundings:</b>" + formatMillion(allKeysValue) + "<br/><b>Current Sector:</b>" + formatMillion(sectorFundValue))
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    

    })
    .on("mouseout", function(d) {       
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });
  
  sector.append('text')
    .datum(function(d) { return d; })
    //.attr('transform', function(d) { return 'translate(' + x(data[17].date) + ',' + y(d[17][1]) + ')'; })
    //.style("z-index", "1")
    //.style('position','absolute')
    .attr('transform', function(d,i) {
        if(i % 2 == 0 ) {
            return   'translate(0,' + y(d[17][1]) + ')'; 
        } else {
            return   'translate(-100,' + y(d[17][1]) + ')'; 
        }
    })
    /* .style('fill', function(d,i) {
        if(i==1) {
            return "darkOrange";
        }
    }) */
    .attr('x', width-6) 
    .attr('dy', '.35em')
    .style("text-anchor", "end")
    //.attr("y", function(d,i) { return i;} )
    //.attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
    //.attr("dy", ".01em")
    .style("font", "12px sans-serif")
    .text(function(d) { return d.key; })
    .attr('fill-opacity',1);


    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .attr("y", 10)
            .attr("x", -10)
            .attr("dy", ".35em")
            //.attr("transform", "rotate(90)")
            .style("text-anchor", "start");
            //.style("fill", function(i) { return color(i); });

g.append("text")             
    .attr("transform",
    "translate(" + (width/2) + " ," + 
                    (height + margin.top ) + ")")
    .style("text-anchor", "middle")
    .attr("class", "label")
    .text("Date");

    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        //.call(yAxis .ticks(20, "s"));

    //svg.append ("text")
    //  .attr("x", 0-margin.left)
    //  .text("Funding Amount in Millions($)")
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "label")
        .style("text-anchor", "middle")
        .text("Funding Amount in Millions($)");


        //Same annotations as Area Chart
    var anot2 = g.append("text")
    .attr("x", x(parseTime("2015-Mar")))
    .attr("y", y(13458425)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot2.append("tspan")
    .attr("x",  x(parseTime("2015-Mar")))
    .attr("dy","1.0em")
    .text("2015 Mar Peak");
    
    anot2.append("tspan")
    .attr("x",  x(parseTime("2015-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(13458425/1e6) + "M ($ 13458425)" );

var anot3 = g.append("text")
    .attr("x", x(parseTime("2016-Mar")))
    .attr("y", y(14194975)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot3.append("tspan")
    .attr("x",  x(parseTime("2016-Mar")))
    .attr("dy","1.0em")
    .text("2016 Mar Peak");
    
    anot3.append("tspan")
    .attr("x",  x(parseTime("2016-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(14194975/1e6) + "M ($ 14194975)" );

var anot4 = g.append("text")
    .attr("x", x(parseTime("2017-Mar")))
    .attr("y", y(16472800)-50)
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot4.append("tspan")
    .attr("x",  x(parseTime("2017-Mar")))
    .attr("dy","1.0em")
    .text("2016 Mar Peak");
    
    anot4.append("tspan")
    .attr("x",  x(parseTime("2017-Mar")))
    .attr("dy","1.0em")
    .text( d3.format(".2f")(16472800/1e6) + "M ($ 16472800)" );


     var annotAgr = g.append("text")
    .attr("x", width/2)
    .attr("y", y(2000000))
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    annotAgr.append("tspan")
    .attr("x",  width/2)
    .attr("dy","1.0em")
    .attr("fill", "blue")
    .text("Highest funded Sector: Agriculture");

    var annotwhole = g.append("text")
    .attr("x", width/2)
    .attr("y", y(13000000))
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    annotwhole.append("tspan")
    .attr("x",  width/2)
    .attr("dy","1.0em")
    .attr("fill", "blue")
    .text("Lowest funded Sector: Wholesale");

    d3.select("#svgChart3_2").style("display", "block");
});

    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
        
    tooltip.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

}


function loadData3_3(draw) {

d3.csv("data/finding_sector_bar.csv", type, function(error, data) {
    
    data.slice().reverse().forEach(function(item, index, object) {
        var chkbox = document.getElementsByName(item.sector);

        if(chkbox != "undefined" && chkbox != null && chkbox.length ==1 ){
            if(chkbox[0].checked == true ) {
                object.sector = item.sector;
                object.funded_amount = +item.funded_amount;
            } else if( chkbox[0].checked == false) {
            // object.splice( index, 1);
            data.splice(object.length - 1 - index, 1);
            }
        }

    });


if(draw) {
    performDrawing_Chart3_3(data);
}
//return data;
});
}

function Refresh_Chart3_3() {

//Since not using clientside cache, reloading from csv (temporary)
// can be implemented with JQuery in storing in cache and loading as needed for filtering etc
//primaryData
//primaryData = loadData(false);

var newData;
loadData3_3(true);
}

function createControls_Chart3_3(){

var pDiv = document.getElementById("sectors");

var newString = "";
for(var i=0; i< sectorLabels.length; i++) {
    newString += '<div class="legend2"><input class="regular-checkbox" type="checkbox" checked id="chk' +i + '" name="'+ sectorLabels[i] + '" value="' + sectorLabels[i] + '"><label for="chk' + i + '">' + sectorLabels[i] + '</label></div>' ;
}
document.getElementById("sectors").innerHTML = newString;


}

function type(d) {
d.funded_amount = +d.funded_amount;
return d;
}

function drawChart3_3() {

hideAllCharts();

d3.select("#svgChart3_3").style("display", "block");

createControls_Chart3_3();
loadData3_3(true);


/* var tooltip = d3.select("body")
    .append("div")
    //.style("position", "absolute")
    .style("position", "absolute")
    .style("top","7%")
    .style("left","22%")
    .style("height", "20px")
    .style("width", "200px")
    .style("background-color", "gray")
    .style("color", "white")
    .style("z-index", "100")
    .style("visibility", "hidden")
    .text("Most funding Sector: Agriculture");

    //tooltip.style("visibility", "visible");
    tooltip.style("visibility", "hidden"); */
}

function performDrawing_Chart3_3(myData) {

var svg = d3.select("#svgChart3_3"),
    margin = {top: 60, right: 100, bottom: 120, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

//svg.select("#svgg").selectAll("*").remove();
svg.selectAll("*").remove();

g = svg.append("g")
    .attr("class", "request")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
        .rangeRound([0,width])
        .paddingInner(0.05);

var y = d3.scaleLinear()
    .range([height, 0]);

var colorScale = d3.scaleOrdinal(d3.schemeCategory20c);

//Draw the Legend
var legend = document.getElementById("legend3_3");
var newLeg = "";

for(var i=0; i< sectorLabels.length; i++) {
    newLeg += '<div class="legend2"><span class="key-dot" style="background:' + colorScale(sectorLabels[i]) + '"></span>' + sectorLabels[i] + '</div>';
}

document.getElementById("legend3_3").innerHTML = newLeg;


var xAxis = d3.axisBottom(x);
//var yAxis = d3.axisLeft(y).tickFormat(function(d){ return d;});
var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(formatMillion);

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

yDomainBar = myData.map(function(d) { return d.funded_amount; });

x.domain(myData.map(function(d) { return d.sector; }));
//y.domain([0, d3.max(yDomainBar)]);
y.domain([0, d3.max(myData, function(d) { return d.funded_amount; })+10000000]);
//adding 10M to draw one more y ticks in the graph


g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .attr("data-legend",function(d) { return d.sector})
    .style("text-anchor", "start");

g.append("g")
    //.attr("transform", "translate(" + x(0) + ",0)")   
    .attr("class", "axis")
    .attr("y", 0)
    .attr("x", 0)
    .call(yAxis .ticks(20, "s"));

    // text label for the x axis
g.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (height + margin.top) + ")")
    .style("text-anchor", "middle")
    .attr("class", "label")
    .text("Sectors");

// text label for the y axis
g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "label")
    .style("text-anchor", "middle")
    .text("Funding Amount in Millions ($)"); 

//var formatValue = d3.format(".2"); 

g.selectAll("rect")
    .data(myData)
    .enter()
    .append("rect")
    .attr("class", "rectbar")
    .attr("x", function(d) { return x(d.sector); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.funded_amount); })
    .attr("height", function(d) { return height - y(d.funded_amount); })
    .attr("fill", function(d,i) { return colorScale(d.sector);} )
    //.attr("fill", function(d,i) {
    //	return "rgb(0, " +  (i+1) * 20 +", " + (i+5) * 20 + ")";
        //return "rgb(0, 0, " + 221 + ")";
    // })
    .on('click', function() {
            //sortBars();
        })
    /* .on('hover', function() {
        div.transition()
            .duration(100)
            .style("fill", "yellowgreen");
    }) */
    .on("mouseover", function(d) {      
        div.transition()        
            .duration(200)      
            .style("opacity", .9);      
        //div .html(formatTime(d.date) + "<br/>"  + d.close)  
        div .html("<b>Sector:</b>" + d.sector + "<br/><b>Funded Amount</b>:"  + formatMillion(d.funded_amount))
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        
        })                  
    .on("mouseout", function(d) {       
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });

    
    var chkbox0 = document.getElementById("chk0");
    var anot1text = document.getElementById("anot1text");
    if(anot1text != "undefined" && anot1text != null) {
        anot1text.style.display = "none";
    }

    if(chkbox0 != "undefined" && chkbox0 != null ){
        if(chkbox0.checked == true ) {
        //Annotations
        var anot1 = g.append("text")
            .attr("id", "anot1text")
            .attr("x", x("Agriculture")+100)
            .attr("y", y(133770635))
            .attr("class","annotate")
            .style("text-anchor", "middle");
        
        anot1.append("tspan")
            .attr("x",  x("Agriculture")+100)
            .attr("dy","1.0em")
            .text("Highest funded Sector: Agriculture");
        
        anot1.append("tspan")
            .attr("x",  x("Agriculture")+100)
            .attr("dy","1.0em")
            .text( formatMillion(133770635) + "($ 133770635)" );

            d3.select("#anot1text").style("display", "block");

        }

    }
    
    var chkbox14 = document.getElementById("chk14");
    var anot2text = document.getElementById("anot2text");
    if(anot2text != "undefined" && anot2text != null) {
        anot2text.style.display = "none";
    } 

    if(chkbox14 != "undefined" && chkbox14 != null ){
        if(chkbox14.checked == true ) {
        //Annotations
        var anot2 = g.append("text")
            .attr("id", "anot2text")
            .attr("x", x("Wholesale"))
            .attr("y", y(918900)-50)
            .attr("class","annotate")
            .style("text-anchor", "middle");
            
            anot2.append("tspan")
            .attr("x",  x("Wholesale"))
            .attr("dy","1.0em")
            .text("Lowest funded Sector: Wholesale");
            
            anot2.append("tspan")
            .attr("x",  x("Wholesale"))
            .attr("dy","1.0em")
            .text( formatMillion(918900) + "($ 918900)" );

            d3.select("#anot2text").style("display", "block");
        }

    }

    d3.select("#svgChart3_3").style("display", "block");
}



//Section 4

function loadData_4() {



}


function drawLegend4_1(xDomain) {
var legend = document.getElementById("legend");
var newString = "";
//<div class="legend2"> <p class="country-name"><span class="key-dot"></span>Agriculture</p> </div>
for(var i=0; i< xDomain.length; i++) {
    //newString += '<span id=L' + i + "'>" + xDomain[i] + "</span>" ;
    //newString += '<div class="legend2"> <p class="country-name"><span class="key-dot" style="background:' + countryColors[i] + '"></span>' + xDomain[i] + '</p> </div>';
    newString += '<div class="legend2"><span class="key-dot" style="background:' + countryColors[i] + '"></span>' + xDomain[i] + '</div>';
}
document.getElementById("legend").innerHTML = newString;
}

function drawChart4_1() {

hideAllCharts();

d3.select("#svgChart4_1").style("display", "block");

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var svg = d3.select("#svgChart4_1"),
    margin = {top: 10, right: 10, bottom: 70, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

svg.selectAll("*").remove();

g = svg.append("g")
    .attr("class", "request")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("data/country_funding_sector1.csv", function(error, data1) {
d3.csv("data/country_sector_partners_count.csv", function(error, data1) {

    data1.forEach(function(d) {
        d.country = d.country;
        d.funded_amount = +d.funded_amount;
        d.partners = +d.partners;
        d.sectors = +d.sectors;
    });

var sortSec = document.getElementById("chk41_1");
var sortcountry = document.getElementById("chk41_2");

if(sortSec.checked) {
    //data1.sort(function(a, b) { return b.funding_amount < a.funding_amount; });
    //data1.sort(d3.ascending);
    data1 = data1.sort(function(a, b) {
        return d3['descending'](a.funded_amount, b.funded_amount);
    });

    //document.getElementById("4_1Tri01").style.display = "none";
    //document.getElementById("4_1Tri01").style.display = "none";

} /* else{
    //data1.sort(function(a, b) { return a.funding_amount > b.funding_amount; });
    //data1.sort(d3.descending);
    data1 = data1.sort(function(a, b) {
        return d3['descending'](a.funded_amount, b.funded_amount);
    });
} */

if(sortcountry.checked) {
    //data1.sort(function(a, b) { return b.funding_amount < a.funding_amount; });
    //data1.sort(d3.ascending);
    data1 = data1.sort(function(a, b) {
        return d3['ascending'](a.country, b.country);
    });

    //document.getElementById("4_1Tri02").style.display = "block";
    //document.getElementById("4_1Tri02").style.display = "block";

} /* else{
    //data1.sort(function(a, b) { return a.funding_amount > b.funding_amount; });
    //data1.sort(d3.descending);
    data1 = data1.sort(function(a, b) {
        return d3['descending'](a.country, b.country);
    });
} */


//data1.sort(function(a, b) { return b.funding_amount - a.funding_amount; });

var x1 = d3.scaleBand()
        .rangeRound([0,width])
        .paddingInner(0.35);

var color = d3.scaleOrdinal()
    .range(countryColors)

var y1 = d3.scaleLinear()
    .range([height, 0]);

var xAxis1 = d3.axisBottom()
    .scale(x1);

//var yAxis = d3.axisLeft(y).tickFormat(function(d){ return d;});
var yAxis1 = d3.axisLeft()
    .scale(y1)
    .tickFormat(formatMillion);


xDomain = data1.map(function(d) { return d.country; });
//yDomainBar = data.map(function(d) { return d.sectors; });
yDomainBar = data1.map(function(d) { return +d.funded_amount; });
//yDomainLine =  data.map(function(d) { return d.partners; });

x1.domain(xDomain);
//y.domain([0, d3.max(data, function(d) { return d.sectors; })]);
y1.domain([0, d3.max(yDomainBar)]);

var legend = document.getElementById("legend");
var newString = "";
//<div class="legend2"> <p class="country-name"><span class="key-dot"></span>Agriculture</p> </div>
for(var i=0; i< xDomain.length; i++) {
    //newString += '<span id=L' + i + "'>" + xDomain[i] + "</span>" ;
    //newString += '<div class="legend2"> <p class="country-name"><span class="key-dot" style="background:' + countryColors[i] + '"></span>' + xDomain[i] + '</p> </div>';
    newString += '<div class="legend2"><span class="key-dot" style="background:' + countryColors[i] + '"></span>' + xDomain[i] + '</div>';
}
document.getElementById("legend").innerHTML = newString;


g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis1)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

g.append("g")
    //.attr("transform", "translate(" + x(0) + ",0)")   
    .attr("class", "axis")
    .call(yAxis1);

// text label for the x axis
g.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (height + margin.top + 50) + ")")
    .style("text-anchor", "middle")
    .attr("class", "label")
    .text("Countries");

// text label for the y axis
g.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "label")
  .style("text-anchor", "middle")
  .text("Funded Amount in Millions(M)"); 

g.selectAll("rect")
  .data(data1)
    .enter()
    .append("rect")
  //.attr("class", "bar")
  .attr("x", function(d) { return x1(d.country); })
  .attr("width", x1.bandwidth())
  .attr("y", function(d) { return y1(d.funded_amount); })
  .attr("height", function(d) { return height - y1(d.funded_amount); })
  .attr("fill", function(d,i) {
        //return "rgb(0, " +  (i+1) * 5 +", " + (i+5) * 3 + ")";
        return color(i);
    //return "rgb(0, 0, " + 221 + ")";
  })
  .each(function(d,i) {



    var header = d3.select(this);
    if(i == 34 ) {
         //59 - phi
         //34 Kenya
        //header.append(anno);
        if(sortcountry.checked) {
            var annot1 = g.append("g")
                .attr("id", "4_1Tri01");

            annot1.append("defs")
                .append("marker")
                .attr("id", "triangle")	
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 6)
                .attr("refY", 0)
                .attr("markerWidth", 8)
                .attr("markerHeight", 10)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .style("stroke", "orange")
                .attr("class","arrowHead");
            //.attr("d", "M2,2 L2,11 L10,6 L2,2");

                
            annot1.append("line")
                .attr("x1",  header.attr("x"))
                .attr("y1",  header.attr("y"))
                .attr("x2",  header.attr("x")-12)
                .attr("y2", header.attr("y")-22)
                .attr("stroke-width", 2)
                .attr("stroke", "orange")
                .attr("marker-end", "url(#triangle)");
        }

        var annot1_1 = g.append("text")
            .attr("x", x1("Kenya")+50)
            .attr("y", y1(32248405)-50)
            .attr("class","annotate")
            .style("text-anchor", "middle");
            
            annot1_1.append("tspan")
            .attr("x",  x1("Kenya")+50)
            .attr("dy","1.0em")
            .text("2nd top funded Country-Kenya");
            
            annot1_1.append("tspan")
            .attr("x",  x1("Kenya")+50)
            .attr("dy","1.0em")
            .text( formatMillion(32248405) );

    } 
    else if(i==59) {
         //59 - phi
         //34 Kenya
        //header.append(anno);
        if(sortcountry.checked) {
       
            var annot1 = g.append("g")
                .attr("id", "4_1Tri02")

            annot1.append("defs")
                .append("marker")
                .attr("id", "triangle1")	
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 6)
                .attr("refY", 0)
                .attr("markerWidth", 8)
                .attr("markerHeight", 10)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .style("stroke", "orange")
                .attr("class","arrowHead");
            //.attr("d", "M2,2 L2,11 L10,6 L2,2");
                
            annot1.append("line")
            .attr("x1",  header.attr("x"))
            .attr("y1",  header.attr("y")+10)
            .attr("x2",  header.attr("x")-20)
            .attr("y2", header.attr("y")+100)
            .attr("stroke-width", 2)
            .attr("stroke", "orange")
            .attr("marker-end", "url(#triangle1)");
        }

        var annot1_1 = g.append("text")
            .attr("x", x1("Philippines")+50)
            .attr("y", y1(54476375)+100)
            .attr("class","annotate")
            .style("text-anchor", "middle");
            
            annot1_1.append("tspan")
            .attr("x",  x1("Philippines")+50)
            .attr("dy","1.0em")
            .text("1st top funded Country-Philippines");
            
            annot1_1.append("tspan")
            .attr("x",  x1("Philippines")+50)
            .attr("dy","1.0em")
            .text( formatMillion(54476375) );
    }

  })
  .on("mouseover", function(d) {      
        div.transition()        
            .duration(200)      
            .style("opacity", .9);      
        //div .html(formatTime(d.date) + "<br/>"  + d.close)  
        //div .html("<b>Country:</b>" + d.country + "<br/><b>Sectors Count</b>:"  + d.sectors)  
        div .html("<b>Country:</b>  " + d.country + "<br/><b>Partners Count</b>:    "  + d.partners + "<br/><b>Sectors Count</b>:   "  + d.sectors + "<br/> <b>Funding:</b> $" + formatMillion(d.funded_amount) )
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        
        })
    .on("mouseout", function(d) {       
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });

    d3.select("#svgChart4_1").style("display", "block");
});



}


function drawChart4_2() {

hideAllCharts();

d3.select("#svgChart4_2").style("display", "block");

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
    
var svg = d3.select("#svgChart4_2"),
margin = {top: 20, right: 20, bottom: 90, left: 60},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.3)
.align(0.1);

var y = d3.scaleLinear()
.rangeRound([height, 0]);

//var z = d3.scaleOrdinal()
//    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
var z = d3.scaleOrdinal(d3.schemeCategory10);

/*
d3.csv("data/country_funding_sector1.csv", function(error, data) {
    data.forEach(function(d) {
    d.country = d.country;
    d.funded_amount = +d.funded_amount;
    d.partners=+d.partners;
    d.sectors=+d.sectors;
}); */

d3.csv("data/country_sector_partners_count.csv", function(d, i, columns) {
//d.total = +d[columns[2] / (+d[columns[2]] + +d[columns[3]])

for (i = 2, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
d.total = t;
//d.total = d[columns[i]]
return d;
}, function(error, data) {
if (error) throw error;

//data1.forEach(function(x){delete x.funded_amount});
var keys = data.columns.slice(2);

//svg.select("#svgg").selectAll("*").remove();
svg.selectAll("*").remove();

g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var sortSec = document.getElementById("chk42_1");
var reverseBar = document.getElementById("chk42_2");
var topLimit = document.getElementById("chk42_3");

if(sortSec.checked) {
data.sort(function(a, b) { return b.total - a.total; });
}

if(topLimit.checked) {
data = data.filter(function(d) { return d.partners > 5 });
}

x.domain(data.map(function(d) { return d.country; }));
y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();

if(reverseBar.checked) {
z.domain(keys.reverse());
} else {
z.domain(keys);
}


//var myData = data.filter(function(d) { return d.total > 50000 });

g.append("g")
.selectAll("g")
.data( d3.stack().keys(keys)(data))
.enter().append("g")
  .attr("fill", function(d) { return z(d.key); })
.selectAll("rect")
.data(function(d) { return d; })
.enter().append("rect")
  .attr("x", function(d) { return x(d.data.country); })
  .attr("y", function(d) { return y(d[1]); })
  .attr("height", function(d) { return y(d[0]) - y(d[1]); })
  .attr("width", x.bandwidth())
  .on("mouseover", function(d) {      
        div.transition()        
            .duration(200)      
            .style("opacity", .9);      
        //div .html(formatTime(d.date) + "<br/>"  + d.close)  
        //div .html("<b>Country:</b>" + d.country + "<br/><b>Sectors Count</b>:"  + d.sectors)  
        div .html("<b>Country:</b>  " + d.data.country + "<br/><b>Partners Count</b>:    "  + d.data.partners + "<br/><b>Sectors Count</b>:   "  + d.data.sectors + "<br/><b>Ratio:" + d3.format(".2f")(d.data.partners/d.data.sectors) + ":1 (partners per sector)</b>")
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        
        })
    .on("mouseout", function(d) {       
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });

g.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

g.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                       (height + margin.top + 70) + ")")
  .style("text-anchor", "middle")
  .attr("class", "label")
  .text("Countries");

g.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y).ticks(null, "s"))
.append("text")
  /*.attr("x", 2)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")*/
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+10)
  .attr("x",0 - (height / 2))
  .attr("dy", "0.35em")
  .attr("fill", "#000")
  .attr("class", "label")
  .style("text-anchor", "middle")
  .text("Partners|Sectors Count");

var legend = g.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
.selectAll("g")
//.data(keys.slice().reverse())
 .data( function() { 
    if(reverseBar.checked) {
        return keys.slice();
    } else {
        return keys.slice().reverse();
    }
    
}) 
.enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", width - 19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", z);

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text(function(d) { return d; });


var anot1 = g.append("text")
    .attr("id", "anot1text")
    .attr("x", x("Kenya"))
    .attr("y", y(58))
    .attr("class","annotate")
    .style("text-anchor", "middle");
    
    anot1.append("tspan")
    .attr("x",  x("Kenya"))
    .attr("dy","1.0em")
    .text("Highest Partners: Kenya");
    
    anot1.append("tspan")
    .attr("x",  x("Kenya"))
    .attr("dy","1.0em")
    .text( 58  );
    

    d3.select("#svgChart4_2").style("display", "block");

});

    
}


// // Chart : Country vs (stack of Partners, Sectors)
// function drawChart4_3() {

// hideAllCharts();

// d3.select("#svgChart4_3").style("display", "block");

// var div = d3.select("body").append("div")   
//     .attr("class", "tooltip")               
//     .style("opacity", 0);
    
// var svg = d3.select("#svgChart4_3"),
// margin = {top: 20, right: 20, bottom: 90, left: 60},
// width = +svg.attr("width") - margin.left - margin.right,
// height = +svg.attr("height") - margin.top - margin.bottom,
// g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var x = d3.scaleBand()
// .rangeRound([0, width])
// .paddingInner(0.05)
// .align(0.1);

// var y = d3.scaleLinear()
// .rangeRound([height, 0]);

// //var z = d3.scaleOrdinal()
// //    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
// var z = d3.scaleOrdinal(d3.schemeCategory10);

// //var y1 = d3.scaleLinear()
// //    .rangeRound([height, 0]);

// // define the line
// /* var valueline = d3.line()
// .x(function(d) { return x(d.country); })
// .y(function(d) { return y(d.partners); })
// //.curve(d3.curveCatmullRomOpen);
// .curve(d3.curveLinear); */


// /* d3.csv("data/country_funding_sector1.csv", function(error, data1) {
//     data1.forEach(function(d) {
//     d.country = d.country;
//     d.funded_amount = +d.funded_amount;
//     d.partners=+d.partners;
//     d.sectors=+d.sectors
// }); */


// //d3.csv("data/country_funding_sector1_1.csv", function(d, i, columns) {
// d3.csv("data/country_sector_partners_count.csv", function(d, i, columns) {

// //d.total = +d[columns[2] / (+d[columns[2]] + +d[columns[3]])

// for (i = 2, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
// d.total = t;
// //d.total = d[columns[i]]
// return d;
// }, function(error, data) {
// if (error) throw error;

// //data.forEach(function(x){delete x.funded_amount});

// var keys = data.columns.slice(2);

// data.sort(function(a, b) { return b.total - a.total; });


// x.domain(data.map(function(d) { return d.country; }));
// y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
// z.domain(keys);

// //y1.domain([0, d3.max(data, function(d) { return d.funded_amount; })]).nice();
// //yDomainLine =  data.map(function(d) { return d.funded_amount; });

// //var myData = data.filter(function(d) { return d.total > 50000 });

// g.append("g")
// .selectAll("g")
// .data( d3.stack().keys(keys)(data))
// .enter().append("g")
//   .attr("fill", function(d) { return z(d.key); })
// .selectAll("rect")
// .data(function(d) { return d; })
// .enter().append("rect")
//   .attr("x", function(d) { return x(d.data.country); })
//   .attr("y", function(d) { return y(d[1]); })
//   .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//   .attr("width", x.bandwidth())
//   .on("mouseover", function(d) {      
//         div.transition()        
//             .duration(200)      
//             .style("opacity", .9);      
//         //div .html(formatTime(d.date) + "<br/>"  + d.close)  
//         //div .html("<b>Country:</b>" + d.country + "<br/><b>Sectors Count</b>:"  + d.sectors)  
//         div .html("<b>Country:</b>  " + d.data.country + "<br/><b>Partners Count</b>:    "  + d.data.partners + "<br/><b>Sectors Count</b>:   "  + d.data.sectors + "<br/><b>Ratio:" + d3.format(".2f")(d.data.sectors/d.data.partners) + "</b>")
//             .style("left", (d3.event.pageX) + "px")     
//             .style("top", (d3.event.pageY - 28) + "px");    
        
//         })
//     .on("mouseout", function(d) {       
//         div.transition()        
//             .duration(500)      
//             .style("opacity", 0);   
//     });

// g.append("g")
//   .attr("class", "axis")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("y", 0)
//     .attr("x", 9)
//     .attr("dy", ".35em")
//     .attr("transform", "rotate(90)")
//     .style("text-anchor", "start");

// g.append("text")             
//   .attr("transform",
//         "translate(" + (width/2) + " ," + 
//                        (height + margin.top + 70) + ")")
//   .style("text-anchor", "middle")
//   .attr("class", "label")
//   .text("Countries");

// g.append("g")
//   .attr("class", "axis")
//   .call(d3.axisLeft(y).ticks(null, "s"))
// .append("text")
//   /*.attr("x", 2)
//   .attr("y", y(y.ticks().pop()) + 0.5)
//   .attr("dy", "0.32em")
//   .attr("fill", "#000")
//   .attr("font-weight", "bold")*/
//   .attr("transform", "rotate(-90)")
//   .attr("y", -margin.left+10)
//   .attr("x",0 - (height / 2))
//   .attr("dy", "0.35em")
//   .attr("fill", "#000")
//   .attr("class", "label")
//   .style("text-anchor", "middle")
//   .text("Partners|Sectors Count");

//     // Add the valueline path.
// /*  g.append("path")
//     //.data([data])
//     .attr("d", valueline(data))
//     .attr("id", 'tag1') // assign ID
//     .attr("class", "line"); */



// var legend = g.append("g")
//   .attr("font-family", "sans-serif")
//   .attr("font-size", 10)
//   .attr("text-anchor", "end")
// .selectAll("g")
// .data(keys.slice().reverse())
// .enter().append("g")
//   .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// legend.append("rect")
//   .attr("x", width - 19)
//   .attr("width", 19)
//   .attr("height", 19)
//   .attr("fill", z);

// legend.append("text")
//   .attr("x", width - 24)
//   .attr("y", 9.5)
//   .attr("dy", "0.32em")
//   .text(function(d) { return d; });
// });

// }