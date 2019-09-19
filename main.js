const blackDice = [0, 1, 1, 1, 2 ,2];
const blueDice = [1, 1, 2, 2, 2, 3];
const orangeDice = [1, 2, 2, 3, 3, 4];

function diceRoll() {
  let dice = ((Math.random() * 6)-.5);
  dice = Math.round(dice);
  return dice;
  // $('.mode').text(dice);
  //simulates a dice roll
}

function getBlackRoll(){
  return blackDice[diceRoll()];
  //simulates a black die roll
}

function getBlueRoll(){
  return blueDice[diceRoll()];
  //simulates a blue die roll
}

function getOrangeRoll(){
  return orangeDice[diceRoll()];
  //simulates an orange die roll
}

function desiredRoll(){
  return document.getElementById("desiredRoll").value;
}

let nBlackRolls = 1;
let nBlueRolls = 0;
let nOrangeRolls = 0;
let aModifier = 0;

function updateRollCount(){
  nBlackRolls = document.getElementById("black").value;
  nBlueRolls = document.getElementById("blue").value;
  nOrangeRolls = document.getElementById("orange").value;
  aModifier = document.getElementById("modifier").value;
}




function simulateRolls(){
  let numberBlackRolls = Number(nBlackRolls);
  let numberBlueRolls = Number(nBlueRolls);
  let numberOrangeRolls = Number(nOrangeRolls);
  let modifier = Number(aModifier);
  
  
  
  let blackTotal = 0;
  while (numberBlackRolls > 0){
    blackTotal += getBlackRoll();
    numberBlackRolls --;
    //get the total point value of however many black rolls there are, i.e. if you roll 2 black die, one is 2 and the other is 1, blackTotal should be = to 3
  }
  
  
  let blueTotal = 0;
  while (numberBlueRolls > 0){
    blueTotal += getBlueRoll();
    numberBlueRolls --;
  }
  

  let orangeTotal = 0;
  while (numberOrangeRolls > 0){
    orangeTotal += getOrangeRoll();
    numberOrangeRolls --;
  }
  return blackTotal + blueTotal + orangeTotal + modifier;
  //returns the total of all dice rolls in one instance
}

function runFiftyRolls(){
  let cumulativeRolls = [];
  for (i = 0; i < 1000; i ++){
      if (cumulativeRolls.length >= 1000){
        break;
      }
      cumulativeRolls.push(simulateRolls());
      // console.log(i);
  }
  console.log('runFiftyRolls ran')
  return cumulativeRolls;
}

let rolls = [];

function updateRolls(){
  rolls = runFiftyRolls();
  console.log('updateRolls ran');
}

function average(){
  let averageRoll = Number(0);
  for (i = 0; i< rolls.length; i++){
      let fuckJavaScript = Number(rolls[i]);
      averageRoll += fuckJavaScript;
  }
  console.log('average ran');
  console.log(averageRoll);
  return averageRoll/rolls.length;
}



function median(){
  rolls.sort(function(a, b){return a - b});
  return rolls[rolls.length /2];
}


function variance(){
  let u = 0;
  // rolls2 = runFiftyRolls();
  let mean = average();
  let variance = 0;
  while (u < rolls.length){
      variance += (mean - rolls[u]) **2;
      u++;
  }  
  console.log("variance ran");
  return Math.round(1000*(variance/rolls.length))/1000;
}


function percentRoll(){
  rolls.sort(function(a, b){return a - b});
  let y = desiredRoll();
  let x = 0;
  while (y < rolls[x] && x < rolls.length){
    x++;
}
return ((rolls.length - x) / 10);
}



function mode(){
  const numberCounts = [];
  
  for (i = 0; i < rolls.length; i ++){
    let y = 0;
    while (y < numberCounts.length){
      if (numberCounts[y].number == rolls[i]){
        numberCounts[y].numberCount +=1;
        break;
        //check numberCounts to see if this roll has already been seen before, if it has increment the numberCount, break out of the loop
      }
      y++;
    }
    if (y == numberCounts.length){
      numberCounts.push({
        number: rolls[i],
        numberCount: 1,
      });
    } // if this roll was not added previously, it will be added here.  If y == numberCounts.length that means it went all the way to the end of the array and did not add it, meaning we have to add it.
  }
  numberCounts.sort(function(a, b){return b.numberCount-a.numberCount});
  return numberCounts[0].number;
}



function getProbability(){
  $(updateRollCount());
  $(updateRolls());
  $('.average').text(average());
  $('.mode').text(mode());
  $('.successChance').text(percentRoll() + '%');
  $('.median').text(median);
  $('.variance').text(variance());
  // console.log("Black rolls: " + nBlackRolls);
  // console.log(runFiftyRolls());
  // console.log('Mode: ' + mode());
  // console.log('Median: ' + median());
  // console.log('Average: ' + average());
  // console.log('Variance: ' + variance());
  // console.log('Percent of success: '+ percentRoll() + '%');
}



