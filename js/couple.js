var Couple = function () {
  var people = [];
  this.mother = new Person("Female");

  this.father = new Person("Male");
  this.father.generateBirthYear();
  if (this.father.birthYear < 0) {
    this.mother.birthYear = -this.father.birthYear;
    this.father.birthYear = 0;
  }

  people.push(this.mother);
  people.push(this.father);

  this.mother.spouse = this.father;
  this.father.spouse = this.mother;

  this.children = [];

  this.minYear = 0;
  this.maxYear = 0;

  CreateTimeline(people);
};

// New button to generate Children
Couple.prototype.addChildrenButton = function () {
  if (document.getElementById('generateChildrenButton')) {
    var div = document.getElementById('childrenDiv')
    div.innerHTML = "";
  }
  else {
    var newButton = document.createElement("BUTTON");
    var txt = document.createTextNode("Generate Children");
    newButton.appendChild(txt);
    newButton.onclick = this.generateChildren.bind(this);
    newButton.setAttribute("class", "btn");
    newButton.setAttribute("id", "generateChildrenButton");
    document.body.appendChild(newButton);
    //addElement ('outputDiv', 'div', 'childDiv', newHTML);
    //document.getElementById ("childButton").onclick = generateChildren(family);
    var newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", "childrenDiv");
    document.body.appendChild(newDiv);
  }
};

Couple.prototype.printUs = function () {
  //console.log (this);
  //AddText (JSON.stringify (this));
  AddText("Mother: " + this.mother.firstName + " " + this.mother.lastName);
  AddText("&nbsp; Age at Death: " + this.mother.ageAtDeath);
  AddText("&nbsp; Blood type: " + this.mother.bloodType[0] + this.mother.bloodType[1]);
  AddText("&nbsp; Sexuality: " + this.mother.sexuality);
  AddText("&nbsp; Brith Year: " + this.mother.birthYear);
  if (this.mother.birthDefects.length > 0) {
    AddText("&nbsp; Birth Defects: ");
    forEachDefectName(this.mother.birthDefects, AddText);
  }
  AddText("Father: " + this.father.firstName + " " + this.father.lastName);
  AddText("&nbsp; Age at Death: " + this.father.ageAtDeath);
  AddText("&nbsp; Blood type: " + this.father.bloodType[0] + this.father.bloodType[1]);
  AddText("&nbsp; Sexuality: " + this.father.sexuality);
  AddText("&nbsp; Brith Year: " + this.father.birthYear);
  if (this.father.birthDefects.length > 0) {
    AddText("&nbsp; Birth Defects: ");
    forEachDefectName(this.father.birthDefects, AddText);
  }
}

Couple.prototype.generateChildren = function () {
  ClearChildText();
  //console.log (this);
  this.children = [];

  this.children.push(new Person());
  this.children[0].printMe();
  this.children.push(new Person());
  this.children[1].printMe();
  this.children.push(new Person());
  this.children[2].printMe();
};

function AddChildText(text) {
  var div = document.getElementById('childrenDiv');
  div.innerHTML += text;
  div.innerHTML += '<br>';
}

function ClearChildText() {
  var div = document.getElementById('childrenDiv');
  if (div) {
    div.innerHTML = '<br>';
  }
}

console.log("Couple loaded");