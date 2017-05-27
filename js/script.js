var numberOfPeopleToGenerate = 5;

function init ()
{
  document.getElementById ("RunButton").onclick = generateCouple;
  document.getElementById ("ClearButton").onclick = ClearText;
  //document.getElementById ("TestButton").onclick = test3;
  
  ClearText();
  console.log ("script.js loaded");

}

function test () {
  var i,tmp;
  var p = 0;

  var distribution = [];
  for (i=0; i<20; i++) {
    distribution.push({
      group: "",
      male: 0,
      female: 0
    });
  }
  for (i=0; i<10000; i++) {
    p = new Person ();
    tmp = p.ageAtDeath / 5;
    //distribution [p.ageAtDeath / 5] += 1;
    if (distribution [tmp].group == "") {
      distribution [tmp].group = (tmp*5).toString() + "-" + (5*tmp+4).toString();
    }
    if (p.sex == "Male") distribution [p.ageAtDeath / 5].male += 1;
    else if (p.sex == "Female") distribution [p.ageAtDeath / 5].female++;
    else AddText ("?: " + p.sex);
  }
  
  populationPyramid (distribution);
}

function graphMale (distribution) {
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
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
}

function graphFemale (distribution) {
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
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
}

function generateCouple () {
  ClearText ();
  var people = [];
  
  var family = new Couple ();
  family.printUs ();
  people.push (family.mother);
  people.push (family.father);
  
  family.addChildrenButton ();
  
  updatePopulationDisplay (people.length);
}

function generatePeople () {
  ClearText ();
  var people = [];
  for (i = 0; i < numberOfPeopleToGenerate; i++)
  {
    var p1 = new Person ();
    people.push (p1);
    people[i].generateBirthDefects ();
    people[i].printMe();
  }
  
  updatePopulationDisplay (people.length);
}

function updatePopulationDisplay (newPop) {  
  var div = document.getElementById('popDiv');
  div.innerHTML = '<br>Population: ' + newPop + '<br>';
}

function ClearText ()
{
  var div = document.getElementById('outputDiv');
  div.innerHTML = '';
  
  div = document.getElementById('popDiv');
  div.innerHTML = 'Population: 0<br>';
  
  if (document.getElementById('childrenDiv'))
  {
    div = document.getElementById('childrenDiv')
    div.parentNode.removeChild (div);
    div = document.getElementById('generateChildrenButton')
    div.parentNode.removeChild (div);
  }
}

function AddText (text)
{
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
  {chance: .10, outcome: 0},
  {chance: .20, outcome: 1},
  {chance: .30, outcome: 2},
  {chance: .40, outcome: 3}
];

function test2 () {
  //console.log (getDiscreteProbableValue (myDataProb));
  var results = [0,0,0,0];
  for (var i=0; i<10000; i++)
  {
    results [getDiscreteProbableValue (myDataProb)]++;
  }
  console.log (results);
}

function getDiscreteProbableValue (probArray) {
  var i;
  var prob = 0;
  var num = Math.random();
  //console.log ('num: ' + num);
  for (i=0; i<probArray.length; i++)
  {
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

function getRandomNumber (lowerBound = 0, upperBound = 1) {
  return Math.floor (Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function forEachDefectName (array, action) {
  for (var i = 0; i < array.length; i++) {
    action (" &nbsp;&nbsp;&nbsp;  " + array [i].name);
  }
}