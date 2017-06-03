var numberOfPeopleToGenerate = 5;
var populationToGenerate = 10000;

function init() {
  document.getElementById("RunButton").onclick = generateCouple;
  document.getElementById("ClearButton").onclick = ClearText;
  document.getElementById("TestButton").onclick = test;

  ClearText();
  console.log("script.js loaded");

}

function test() {
  ClearText();
  var i;

  var distribution = [];
  for (i = 0; i < 105; i += 5) {
    distribution.push({
      group: (i).toString() + "-" + (i + 4).toString(),
      male: 0,
      female: 0
    });
  }
  //console.log(distribution);
  for (i = 0; i < populationToGenerate; i++) {
    var p = new Person();
    //console.log(i, p.sex, p.ageAtDeath, Math.round(p.ageAtDeath/5));
    var tmp = Math.round(p.ageAtDeath / 5);
    //console.log(tmp);
   
    if (p.sex == "Male") {
      distribution[tmp].male += 1;
    } else if (p.sex == "Female") {
      distribution[tmp].female += 1;
    } else {
      AddText("?: " + p.sex);
    }
  }
  total = 0;
  for (i = 0; i < distribution.length; i++) {
    //console.log(distribution[i].group, distribution[i].male, distribution[i].female);
    total += distribution[i].female;
    total += distribution[i].male;
  }
  //console.log('total:', total);

  populationPyramid(distribution);
}

function graphMale(distribution) {
  var rangeMin = 0;
  var rangeMax = 420;
  var x = d3.scale.linear()
    .domain([0, d3.max(distribution)])
    .range([rangeMin, rangeMax]);

  d3.select(".chart")
    .selectAll("div")
    .data(distribution)
    .enter().append("div")
    //.attr("x", function(d) { return (rangeMax - x(d)); })
    //.attr("y", function(d, i) { return (i*12); })
    .style("width", function (d) { return x(d) + "px"; })
    .text(function (d) { return d; });
}

function graphFemale(distribution) {
  var rangeMin = 0;
  var rangeMax = 420;
  var x = d3.scale.linear()
    .domain([0, d3.max(distribution)])
    .range([rangeMin, rangeMax]);

  d3.select(".chart2")
    .selectAll("div")
    .data(distribution)
    .enter().append("div")
    //.attr("x", function(d) { return (rangeMax - x(d)); })
    //.attr("y", function(d, i) { return (i*12); })
    .style("width", function (d) { return x(d) + "px"; })
    .text(function (d) { return d; });
}

function generateCouple() {
  ClearText();
  var people = [];

  var family = new Couple();
  family.printUs();
  people.push(family.mother);
  people.push(family.father);

  family.addChildrenButton();

  updatePopulationDisplay(people.length);
}

function generatePeople() {
  ClearText();
  var people = [];
  for (i = 0; i < numberOfPeopleToGenerate; i++) {
    var p1 = new Person();
    people.push(p1);
    people[i].generateBirthDefects();
    people[i].printMe();
  }

  updatePopulationDisplay(people.length);
}

function updatePopulationDisplay(newPop) {
  var div = document.getElementById('popDiv');
  div.innerHTML = '<br>Population: ' + newPop + '<br>';
}

function ClearText() {
  var div = document.getElementById('outputDiv');
  div.innerHTML = '';

  div = document.getElementById('popDiv');
  div.innerHTML = 'Population: 0<br>';

  if (document.getElementById('childrenDiv')) {
    div = document.getElementById('childrenDiv')
    div.parentNode.removeChild(div);
    div = document.getElementById('generateChildrenButton')
    div.parentNode.removeChild(div);
  }

  var pyr;
  if (pyr = document.getElementById('pop_pyramid')) {
    pyr.remove();
  }
  //newTimeline
  if (pyr = document.getElementById('newTimeline')) {
    pyr.remove();
  }
}

function AddText(text) {
  var div = document.getElementById('outputDiv');
  div.innerHTML += text;
  div.innerHTML += '<br>';
}

function addElement(parentId, elementTag, elementId, html) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

var myDataProb = [
  { chance: .10, outcome: 0 },
  { chance: .20, outcome: 1 },
  { chance: .30, outcome: 2 },
  { chance: .40, outcome: 3 }
];

function test2() {
  //console.log (getDiscreteProbableValue (myDataProb));
  var results = [0, 0, 0, 0];
  for (var i = 0; i < 10000; i++) {
    results[getDiscreteProbableValue(myDataProb)]++;
  }
  console.log(results);
}

function getDiscreteProbableValue(probArray) {
  var i;
  var prob = 0;
  var num = Math.random();
  //console.log ('num: ' + num);
  for (i = 0; i < probArray.length; i++) {
    prob += probArray[i].chance;
    //console.log ('prob: ' + prob);
    //if (num <= prob) return probArray[i].outcome;
    if (num <= prob) {
      //console.log ('returning: ' + i);
      return i;
    }
  }
  return probArray.length - 1;
}

function getRandomNumber(lowerBound = 0, upperBound = 1) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function forEachDefectName(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(" &nbsp;&nbsp;&nbsp;  " + array[i].name);
  }
}