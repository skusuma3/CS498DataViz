var width = 720;
var height = 405;
 
var Loans = [];
//var SectorLoans =[];
//var SectorLoans = [ ["Food", 300], ["Transportation", 575],["Arts", 200],["Food", 400],["Services", 250]]
var sectorAggregate = {};
var sectorH = [];

function kivaLoanEntry(id, funded_amount, sector, country, partner_id, loandate ) {
    this.id = id;
    this.funded_amount = funded_amount;
    this.sector = sector;
    this.country = country;
    this.partner_id = partner_id;
    this.loandate = loandate;
  };
 
  function AddLoan(row) {
    Loans.push(new kivaLoanEntry(+row.id, +row.funded_amount, row.sector, row.country, row.partner_id, row.date));
    //SectorLoans.push( [row.sector, +row.funded_amount] );

    if (!sectorAggregate.hasOwnProperty(row.sector)) {
        sectorAggregate[row.sector] = +row.funded_amount;
    } else {
        sectorAggregate[row.sector] += +row.funded_amount;
    }

  }
 
  function getFrequencyHashtable (array) {
    var hashtable = {};
    array.forEach(function (element) {
        //console.log(element);
        if (!hashtable.hasOwnProperty(element[0])) {
            hashtable[element[0]] = element[1];
        } else {
            hashtable[element[0]] += element[1];
        }
    });
    return hashtable;
}

// And then get a sorted array without duplicates out of it
function sortByFrequency (array) {
    var hashtable = getFrequencyHashtable(array);
    var tuples = [];
    for (var key in hashtable) {
        if (hashtable.hasOwnProperty(key)) {
           tuples.push([key, hashtable[key]]);
        }
    }
    return tuples.sort(function(a, b) { 
        return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
    });
}

function sortHashTable(hashSector) {
    var tuples = [];
    for (var key in hashSector) {
        if (hashSector.hasOwnProperty(key)) {
           tuples.push([key, hashSector[key]]);
        }
    }
    return tuples.sort(function(a, b) { 
        return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
    });
}

function loadCSV(){
    d3.csv("data/kiva_mini.csv", function(data) {
        //console.log(data[0]);
        //Loans = data.map(function(d) { return [ +d["id"], +d["funded_amount"], d["sector"], ["country"], +d["partner_id"], d["date"] ]; });
        data.map(AddLoan)
        console.log(Loans)
        console.log(sectorAggregate);
        //prepareSectorAggregates();
    });
}

function loadCSV1(){
    d3.csv("data/kiva_loans-cols.csv", function(data) {
        //console.log(data[0]);
        //Loans = data.map(function(d) { return [ +d["id"], +d["funded_amount"], d["sector"], ["country"], +d["partner_id"], d["date"] ]; });
        data.map(AddLoan)
        console.log("Loans Length:"+ Loans.length);
        
        console.log(sectorAggregate);
        console.log("SectorsAggregate:" + sectorAggregate.length);

        sectorH = sortHashTable(sectorAggregate);
        console.log(sectorH);
        //console.log(sectorH[0][0]);
        console.log("Dataset loading complete.");
        //prepareSectorAggregates();
        updateViz(sectorH)

        
    });
}


function loadDataset() {
    loadCSV1();
    //prepareSectorAggregates();    
}


function prepareSectorAggregates() {
    console.log('prepare')
    console.log(SectorLoans);
    //var l = getFrequencyHashtable(SectorLoans);
    var l = sortByFrequency(SectorLoans);
    console.log(l);
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
  document.getElementById("loader").style.display = "none";
  
  // There are enought html elements and here following Update Pattern
  d3.select("#list").selectAll("li").data(sectorAggregate)
    .text(function(d) { return d.key; })
    .enter().append("li")
    .text(function(d)  {return d.key + ":"+ d.value;})
 
    d3.select("#listsorted").selectAll("li").data(sectorH)
    .text(function(d,i) { return d[i][0]; })
    .enter().append("li")
    .text(function(d,i)  {return d[i][0] + ":"+ d[i][1];})

    //d3.select("p")
    //    .datum(50)
    //    .text(function(d) { 
     //       return "Used existing paragraph element and the data " + d + " is assigned."; 
     //   });

    d3.select("div")
        .datum(100)
        .append("p")
        .text(function (d, i) {
            console.log(d); // the data element
            console.log(i); // the index element
            console.log(this); // the current DOM object
            return d;
            });

    var xScale = d3.scale.ordinal()
        .domain(d3.range(sectorH.length))
        .rangeRoundBands([0, w], 0.05); 

    var yScale = d3.scale.linear()
        .domain([0, d3.max(sectorH.value)])
        .range([0, h]);

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
