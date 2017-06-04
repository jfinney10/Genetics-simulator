var Person = function (gender = "") {
  this.lastName = generateLastName();
  this.firstName = "";
  if (gender != "") { this.sex = gender; }
  else { this.sex = getRandomSex(); }
  this.firstName = generateFirstName(this.sex);

  this.age = -1;
  this.ageAtDeath = 0;

  this.birthYear = 0;

  this.spouse = "";
  this.children = [];
  this.parents = [];
  this.birthDefects = [];
  this.generateBirthDefects();
  this.ageAtDeath = this.generateDeathAge();

  this.sexuality = this.generateSexuality();
  this.bloodType = this.generateBloodType();
  this.freckles = 0;
  this.pheomelanin = 0;
  this.melanin = 0;
  this.eyeColor = 0;
  this.skin = 0;
  this.height = 0;
  this.constitution = 0;
  this.physical = 0;
  this.iq = 0;
  this.fertility = 0;
  this.apperance = 0;
};

Person.prototype.generateBirthYear = function () {
  var birthArray = [
    { chance: 0.01, result: 5 },
    { chance: 0.03, result: 4 },
    { chance: 0.03, result: 3 },
    { chance: 0.03, result: 2 },
    { chance: 0.05, result: 1 },
    { chance: 0.11, result: 0 },
    { chance: 0.11, result: -1 },
    { chance: 0.11, result: -2 },
    { chance: 0.11, result: -3 },
    { chance: 0.11, result: -4 },
    { chance: 0.07, result: -5 },
    { chance: 0.03, result: -6 },
    { chance: 0.04, result: -7 },
    { chance: 0.04, result: -8 },
    { chance: 0.03, result: -9 },
    { chance: 0.03, result: -10 }
  ];

  this.birthYear += birthArray[getDiscreteProbableValue(birthArray)].result;
  console.log('father\'s birth year difference: ' + this.birthYear);
}

Person.prototype.generateSexuality = function () {
  var num = getRandomNumber(0, 100000);
  if (num >= 4501) return "Heterosexual";
  else return "Homosexual";
}

//TODO - adjust to use array and getDiscreteProbableValue()
Person.prototype.generateBloodType = function () {
  /* 45% OO, 26.6% AO, 13.3% AA, 9.6% BO, 5% AB, 0.3% BB */
  var rv;
  var num = getRandomNumber(0, 1000);

  if (num <= 450) rv = ["O", "O"];
  else if (num <= 450 + 133) rv = ["A", "O"];
  else if (num <= 450 + 133 + 266) rv = ["A", "A"];
  else if (num <= 450 + 133 + 266 + 096) rv = ["B", "O"];
  else if (num <= 450 + 133 + 266 + 096 + 005) rv = ["A", "B"];
  else rv = ["B", "B"];
  //console.log ("  generateBloodType returning " + rv.toString());
  return rv;
};

Person.prototype.calcDeathYear = function () {
  if (this.hasFatalTrait()) {
    this.ageAtDeath = 0;
    return;
  }

  var num = getRandomNumber(0, 1000);

  if (num <= 5) this.ageAtDeath = 0;
  else if (num <= 15) this.ageAtDeath = 5;
  else if (num <= 20) this.ageAtDeath = 10;
  else if (num <= 25) this.ageAtDeath = 15;
  else if (num <= 30) this.ageAtDeath = 20;
  else if (num <= 35) this.ageAtDeath = 25;
  else if (num <= 40) this.ageAtDeath = 30;
  else if (num <= 45) this.ageAtDeath = 35;
  else if (num <= 70) this.ageAtDeath = 40;
  else if (num <= 95) this.ageAtDeath = 45;
  else if (num <= 130) this.ageAtDeath = 50;
  else if (num <= 165) this.ageAtDeath = 55;
  else if (num <= 285) this.ageAtDeath = 60;
  else if (num <= 455) this.ageAtDeath = 65;
  else if (num <= 665) this.ageAtDeath = 70;
  else if (num <= 815) this.ageAtDeath = 75;
  else if (num <= 880) this.ageAtDeath = 80;
  else if (num <= 920) this.ageAtDeath = 85;
  else if (num <= 960) this.ageAtDeath = 90;
  else this.ageAtDeath = 95;
};

Person.prototype.printMe = function () {
  /*
  console.log ("Name: " + this.firstName + " " + this.lastName);
  console.log (" Sex: " + this.sex);
  
  if (this.birthDefects.length > 0)
  {
    console.log (" Birth Defects: ");
    for (var iter=0; iter<this.birthDefects.length; iter++)
    {
      console.log ("   " + this.birthDefects[iter].name);
    }
  }
  */
  AddChildText("Name: " + this.firstName + " " + this.lastName);
  AddChildText("&nbsp; Sex: " + this.sex);
  AddChildText("&nbsp; Age at Death: " + this.ageAtDeath);
  AddChildText("&nbsp; Blood type: " + this.bloodType[0] + this.bloodType[1]);
  if (this.birthDefects.length > 0) {
    AddChildText("&nbsp; Birth Defects: ");
    for (var iter = 0; iter < this.birthDefects.length; iter++) {
      AddChildText(" &nbsp;&nbsp;&nbsp;  " + this.birthDefects[iter].name);
    }
  }
}

Person.prototype.printMe2 = function () {
  var div = document.getElementById('textHere');
  div.innerHTML = div.innerHTML + this.name + ' ' + this.title + '<br>';
}

Person.prototype.Introduce = function (spacesToIndent) {
  var spaces = '';
  if (spacesToIndent != null) {
    for (var i = 0; i < spacesToIndent; i++) spaces += '-';
  }
  var div = document.getElementById('textHere');
  div.innerHTML = div.innerHTML + spaces +
    "Hi, my name is " + this.name + '. ' +
    "I am " + this.titleWithArticle + '.<br>';
  if (this.reports.length != 0) {
    for (var i = 0; i < this.reports.length; i++) this.reports[i].Introduce(spacesToIndent + 2);
  }
}

function getRandomSex() {
  var t = Math.random();
  if (t > .5) return "Male";
  else return "Female";
}

function generateFirstName(sex) {
  if (sex === "Male") return maleFirstNames[getRandomNumber(0, maleFirstNames.length - 1)];
  else return femaleFirstNames[getRandomNumber(0, femaleFirstNames.length - 1)];
}

function generateLastName() {
  return lastNames[getRandomNumber(0, lastNames.length - 1)];
}

Person.prototype.generateBirthDefects = function () {
  var i;
  for (i = 0; i < birthDefectList.length; i++) {
    var t = Math.random();
    if (t < birthDefectList[i].rate) {
      //console.log ("   Adding: " + birthDefectList[i].name);
      this.birthDefects.push(birthDefectList[i]);
      //console.log ("   List: " + this.birthDefects);
    }
  }
}

Person.prototype.hasFatalTrait = function () {
  if (this.birthDefects.length == 0) return false;
  var i;
  for (i = 0; i < this.birthDefects.length; i++) {
    if (this.birthDefects[i].fatalityRate == 1.0) return true;
  }
}

Person.prototype.generateDeathAge = function () {
  if (this.hasFatalTrait()) {
    this.ageAtDeath = 0;
    return 0;
  }

  var deathAgeIndex = getDiscreteProbableValue(deathArray);
  //console.log ('index: '+ deathAgeIndex);
  var upperDeathAge = deathArray[deathAgeIndex].result;
  //console.log ('upper:' + upperDeathAge);
  if (upperDeathAge == 0) {
    return 0;
  }
  var lowerAge = deathArray[deathAgeIndex - 1].result + 1;
  //console.log ('lower: ' + lowerAge);
  var rv = getRandomNumber(lowerAge, upperDeathAge);
  //console.log ('rv: ' + rv);
  return rv;
}

function test3(p) {
  //getDiscreteProbableValue (deathArray);

  var results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < 100000; i++) {
    results[getDiscreteProbableValue(deathArray)]++;
  }
  console.log(results);


  /*
  =IF(AND(OR(AB15="[FATAL] EDWARDS SYNDROME (TRISOMY 18)",
             AB16="[FATAL] TRISOMY 13",
             AB17="[FATAL - MISCARRIAGE] DOWN'S SYNDROME (TRISOMY 21)",
             AB20="[FATAL] GASTROSCHISIS OR OMPHALOCELE",
             AB27="[FATAL] SPINAL MUSCULAR ATROPHE")),0,
  IF(AND(OR(AB24="[FATAL BY 25] CYSTIC FIBROSIS",
  AB28="AB - DUCHENNE MUSCULAR DYSTROPHY [FATAL BY 25]",
  AB28="[FATAL BY 25] DUCHENNE MUSCULAR DYSTROPHY",
  AB21="[FATAL BY 25] MITOCHONDRIAL MYOPATHY")),
  IF(X9>=96000,25,
  IF(X9>=92000,24,
  IF(X9>=88000,23,
  IF(X9>=84000,22,
  IF(X9>=80000,21,
  IF(X9>=76000,20,
  IF(X9>=72000,19,
  IF(X9>=68000,18,
  IF(X9>=64000,17,
  IF(X9>=60000,16,
  IF(X9>=56000,15,
  IF(X9>=52000,14,
  IF(X9>=48000,13,
  IF(X9>=44000,12,
  IF(X9>=40000,11,
  IF(X9>=36000,10,
  IF(X9>=32000,9,
  IF(X9>=28000,8,
  IF(X9>=24000,7,
  IF(X9>=20000,6,
  IF(X9>=16000,5,
  IF(X9>=12000,4,
  IF(X9>=8000,3,
  IF(X9>=4000,2,
  IF(X9>=1,1))))))))))))))))))))))))),
  IF(X9>Death!$M$45,
IF(X9>Death!$M$104,Death!$I$105,
IF(X9>Death!$M$103,Death!$I$104,
IF(X9>Death!$M$102,Death!$I$103,
IF(X9>Death!$M$101,Death!$I$102,
IF(X9>Death!$M$100,Death!$I$101,
IF(X9>Death!$M$99,Death!$I$100,
IF(X9>Death!$M$98,Death!$I$99,
IF(X9>Death!$M$97,Death!$I$98,
IF(X9>Death!$M$96,Death!$I$97,
IF(X9>Death!$M$95,Death!$I$96,
IF(X9>Death!$M$94,Death!$I$95,
IF(X9>Death!$M$93,Death!$I$94,
IF(X9>Death!$M$92,Death!$I$93,
IF(X9>Death!$M$91,Death!$I$92,
IF(X9>Death!$M$90,Death!$I$91,
IF(X9>Death!$M$89,Death!$I$90,
IF(X9>Death!$M$88,Death!$I$89,
IF(X9>Death!$M$87,Death!$I$88,
IF(X9>Death!$M$86,Death!$I$87,
IF(X9>Death!$M$85,Death!$I$86,
IF(X9>Death!$M$84,Death!$I$85,
IF(X9>Death!$M$83,Death!$I$84,
IF(X9>Death!$M$82,Death!$I$83,
IF(X9>Death!$M$81,Death!$I$82,
IF(X9>Death!$M$80,Death!$I$81,
IF(X9>Death!$M$79,Death!$I$80,
IF(X9>Death!$M$78,Death!$I$79,
IF(X9>Death!$M$77,Death!$I$78,
IF(X9>Death!$M$76,Death!$I$77,
IF(X9>Death!$M$75,Death!$I$76,
IF(X9>Death!$M$74,Death!$I$75,
IF(X9>Death!$M$73,Death!$I$74,
IF(X9>Death!$M$72,Death!$I$73,
IF(X9>Death!$M$71,Death!$I$72,
IF(X9>Death!$M$70,Death!$I$71,
IF(X9>Death!$M$69,Death!$I$70,
IF(X9>Death!$M$68,Death!$I$69,
IF(X9>Death!$M$67,Death!$I$68,
IF(X9>Death!$M$66,Death!$I$67,
IF(X9>Death!$M$65,Death!$I$66,
IF(X9>Death!$M$64,Death!$I$65,
IF(X9>Death!$M$63,Death!$I$64,
IF(X9>Death!$M$62,Death!$I$63,
IF(X9>Death!$M$61,Death!$I$62,
IF(X9>Death!$M$60,Death!$I$61,
IF(X9>Death!$M$59,Death!$I$60,
IF(X9>Death!$M$58,Death!$I$59,
IF(X9>Death!$M$57,Death!$I$58,
IF(X9>Death!$M$56,Death!$I$57,
IF(X9>Death!$M$55,Death!$I$56,
IF(X9>Death!$M$54,Death!$I$55,
IF(X9>Death!$M$53,Death!$I$54,
IF(X9>Death!$M$52,Death!$I$53,
IF(X9>Death!$M$51,Death!$I$52,
IF(X9>Death!$M$50,Death!$I$51,
IF(X9>Death!$M$49,Death!$I$50,
IF(X9>Death!$M$48,Death!$I$49,
IF(X9>Death!$M$47,Death!$I$48,
IF(X9>Death!$M$46,Death!$I$47,
IF(X9>Death!$M$45,Death!$I$46,
)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
IF(X9<=Death!$M$45,
IF(X9>Death!$M$44,Death!$I$45,
IF(X9>Death!$M$43,Death!$I$44,
IF(X9>Death!$M$42,Death!$I$43,
IF(X9>Death!$M$41,Death!$I$42,IF(X9>Death!$M$40,Death!$I$41,
IF(X9>Death!$M$39,Death!$I$40,
IF(X9>Death!$M$38,Death!$I$39,
IF(X9>Death!$M$37,Death!$I$38,
IF(X9>Death!$M$36,Death!$I$37,
IF(X9>Death!$M$35,Death!$I$36,
IF(X9>Death!$M$34,Death!$I$35,
IF(X9>Death!$M$33,Death!$I$34,
IF(X9>Death!$M$32,Death!$I$33,
IF(X9>Death!$M$31,Death!$I$32,
IF(X9>Death!$M$30,Death!$I$31,
IF(X9>Death!$M$29,Death!$I$30,
IF(X9>Death!$M$28,Death!$I$29,
IF(X9>Death!$M$27,Death!$I$28,
IF(X9>Death!$M$26,Death!$I$27,
IF(X9>Death!$M$25,Death!$I$26,
IF(X9>Death!$M$24,Death!$I$25,
IF(X9>Death!$M$23,Death!$I$24,
IF(X9>Death!$M$22,Death!$I$23,
IF(X9>Death!$M$21,Death!$I$22,
IF(X9>Death!$M$20,Death!$I$21,
IF(X9>Death!$M$19,Death!$I$20,
IF(X9>Death!$M$18,Death!$I$19,
IF(X9>Death!$M$17,Death!$I$18,
IF(X9>Death!$M$16,Death!$I$17,
IF(X9>Death!$M$15,Death!$I$16,
IF(X9>Death!$M$14,Death!$I$15,
IF(X9>Death!$M$13,Death!$I$14,
IF(X9>Death!$M$12,Death!$I$13,
IF(X9>Death!$M$11,Death!$I$12,
IF(X9>Death!$M$10,Death!$I$11,
IF(X9>Death!$M$9,Death!$I$10,
IF(X9>Death!$M$8,Death!$I$9,
IF(X9>Death!$M$7,Death!$I$8,
IF(X9>Death!$M$6,Death!$I$7,
IF(X9>Death!$M$5,Death!$I$6,
IF(X9>=Death!$M$4,Death!$I$5,"")))))))))))))))))))))))))))))))))))))))))))))
  */
}

console.log("Person loaded");

var deathArray = [
  { chance: 0.005, result: 0 },
  { chance: 0.01, result: 5 },
  { chance: 0.03, result: 35 },
  { chance: 0.05, result: 45 },
  { chance: 0.07, result: 55 },
  { chance: 0.12, result: 65 },
  { chance: 0.17, result: 70 },
  { chance: 0.21, result: 75 },
  { chance: 0.15, result: 80 },
  { chance: 0.065, result: 85 },
  { chance: 0.12, result: 100 }
];

var maleFirstNames = [
  "AARON",
  "ABDUL",
  "ABE",
  "ABEL",
  "Abirard",
  "ABRAHAM",
  "ABRAM",
  "ADALBERTO",
  "ADAM",
  "ADAN",
  "Adario",
  "ADOLFO",
  "ADOLPH",
  "Adon",
  "ADRIAN",
  "Advem",
  "Aekley",
  "Aelom",
  "AFTON",
  "AGUSTIN"
];

var femaleFirstNames = [
  "ABBEY",
  "ABBIE",
  "ABBY",
  "ABIGAIL",
  "Abilene",
  "Abril",
  "ADA",
  "ADAH",
  "ADALINE",
  "Adda",
  "Addalyn",
  "ADDIE",
  "ADELA",
  "ADELAIDA",
  "ADELAIDE",
  "ADELE",
  "ADELIA",
  "ADELINA",
  "ADELINE",
  "Adelise"
];

var lastNames = [
  "AABERG",
  "AADLAND",
  "AAGAARD",
  "AARON",
  "AARONS",
  "ABAD",
  "ABADI",
  "ABADIE",
  "ABAIR",
  "ABAJA",
  "ABAJIAN",
  "ABALOS",
  "ABALOZ",
  "ABAR",
  "ABARCA",
  "ABARE",
  "ABASCAL",
  "ABASTA",
  "ABATE",
  "ABATI"
];

// Just a list for now.  Could be called conditionList
var birthDefectList = [
  { name: "ANOPTHALMIA/MICROPTHALMIA", rate: 1 / 50000, fatalityRate: 0.0 },
  { name: "SPINA BIFIDA", rate: 1 / 10000, fatalityRate: 0.0 },
  { name: "REDUCTION DEFORMITY UPPER LIMBS", rate: 9 / 25000, fatalityRate: 0.0 },
  { name: "REDUCTION DEFORMITY LOWER LIMBS", rate: 9 / 50000, fatalityRate: 0.0 },
  { name: "EDWARDS SYNDROME [TRISOMY 18]", rate: 19 / 50000, fatalityRate: 1.0 },
  { name: "TRISOMY 13", rate: 7 / 50000, fatalityRate: 1.0 },
  { name: "DOWN'S SYNDROME [TRISOMY 21]", rate: 73 / 50000, fatalityRate: 0.0 },
  { name: "ISODICENTRIC 15", rate: 7 / 50000, fatalityRate: 0.0 },
  { name: "CLEFT LIP W/ OR W/O CLEFT PALATE", rate: 7 / 5000, fatalityRate: 0.0 },
  { name: "GASTROSCHISIS OR OMPHALOCELE", rate: 1 / 10000, fatalityRate: 1.0 },

  { name: "MITOCHONDRIAL MYOPATHY", rate: 1 / 6250, fatalityRate: 0.0 },
  { name: "LEBER'S HEREDITARY OPTIC NEUROPATHY", rate: 1 / 10000, fatalityRate: 0.0 },
  { name: "HETEROCHROMIA", rate: 3 / 5000, fatalityRate: 0.0 },
  { name: "CYSTIC FIBROSIS", rate: 1 / 2500, fatalityRate: 0.0 },
  { name: "TETRALOGY OF FALLOT", rate: 3 / 500, fatalityRate: 0.0 },
  { name: "SICKLE CELL ANEMIA", rate: 1 / 5000, fatalityRate: 0.0 },
  { name: "SPINAL MUSCULAR ATROPHE", rate: 1 / 10000, fatalityRate: 0.5 },
  { name: "DUCHENNE MUSCULAR DYSTROPHY", rate: 1 / 10000, fatalityRate: 0.0 },
  { name: "HAEMOPHILIA", rate: 1 / 5000, fatalityRate: 0.0 },
  { name: "COLOR BLINDNESS", rate: 2 / 25, fatalityRate: 0.0 }
];

var fertilityRate = [
  { age: 16, rate: .005 },
  { age: 18, rate: .0075 },
  { age: 20, rate: .02 },
  { age: 22, rate: .06 },
  { age: 24, rate: .12 },
  { age: 26, rate: .22 },
  { age: 28, rate: .18 },
  { age: 30, rate: .12 },
  { age: 32, rate: .10 },
  { age: 34, rate: .08 },
  { age: 36, rate: .06 },
  { age: 38, rate: .02 },
  { age: 40, rate: .0025 },
  { age: 42, rate: .0025 },
  { age: 44, rate: .0025 }
];