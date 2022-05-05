//accept two inputs: the total amount of the sale and the amount tendered by the customer.
  // Then, it should calculate the amount of change due in dollars, quarters, dimes, nickels and pennies.
//create an var dollarCoins object with dollar title and value listed highest to lowest(twenty:20.00, ten:10 etc)
  let dollarCoins = {//decending list - 0 is 20 dollar bill, then ten dollar bill etc...then coins follow quarter, dime etc..)
    0: 20,
    1: 10,
    2:5,
    3:1,
    4:0.25,
    5:0.10,
    6:0.05,
    7:0.01
  }
  let billCoinWordsArr = [// I will refactor code later to remove this array
    "twenty",
    "ten",
    "five",
   "one",
    "quarters",
  "dimes",
   "nickels",
   "pennies"
  ]
 //countup animation displaying dollar and coin values
            //reference source: https://codepen.io/chriscoyier/pen/xxVBqEg
function animateValue(i, start, end, duration) {
              let startTimestamp = null;
              const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                document.getElementById(billCoinWordsArr[i]+"-output").innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                  requestAnimationFrame(step);
                }};
              requestAnimationFrame(step);
            }
  function calculateBtnClick(){
    //var countUp = new CountUp('test', 2000);
    //countUp.start()  
    //clear all output boxes
    billCoinWordsArr.map(x => document.getElementById(x +"-output").innerHTML="");
    document.getElementById("output-total-due").innerHTML="";
    document.getElementById("errorMessage").innerHTML="";
    let amountDue = document.getElementById("amount-due").value;
    let amountGiven = document.getElementById("amount-received").value;
   if(checkifNum(amountDue,amountGiven)){
       calculateChange(parseFloat(amountDue),parseFloat(amountGiven))
  }}
  function checkifNum(amountDue, amountGiven){ 
    //check if both input boxes values are all numbers and no empty string
    if (isNaN(amountDue) || amountDue=="") {
       document.getElementById("errorMessage").innerHTML = "Amount due is required! Use numbers only.";
       return false;
    }
    else if(isNaN(amountGiven) || amountGiven==""){
      document.getElementById("errorMessage").innerHTML = "Amount Given is required! Use numbers only.";
      return false;
    }
    return true;
}
function calculateChange(amountDue, amountGiven){
  //counting();
  //totalChange is amountDue - amountGiven 
  //if the total change is a positive number (bigger than 0)
  //then the customer still owes cashier more money
  //only display  message that customer still owe money and how much
  //else if the totalChange is less than <=0 then display totalChange 
  // in Totalbox but not with the negitive sign.
  //go though the object dollarCoins and check from highest to lowest bill can be divided give a number >=1.00
  // start with 20 dollar bill-  divide the totalChange and divide by 20
  // if <1 display 0 for 20dollarbill result box then go to the next lowest bill and divide by that value
  //else if >= 1 then display the integer with out the decimal points.
  //display for 20 dollar bill result
  //totalChange = totalChange - (# of 20dollar bills x 20)
  //then continue to the next bill same thing but using new value of totalChange
  //and  then go through all the coins
//once totalChangeLeft=0 then done... the other empty value will =0
      let totalChangeDue= Math.abs(amountDue.toFixed(2) - amountGiven.toFixed(2));
      let totalChangeLeft= Math.abs(amountDue - amountGiven);
      let moneyCountArry =[];//will be arry of integers to represents the count of bills & coins from highest value to lowest
      let currentMoneyCount=0;
      if (amountGiven >= amountDue){//if you owe change 
        document.getElementById("output-total-due").innerHTML="$"+ totalChangeDue.toFixed(2);
        document.getElementById("dollars-output").innerHTML=parseInt(totalChangeDue);
        for(let i =0; i< Object.keys(dollarCoins).length; i++){
          let currentMoneyCount = parseInt(totalChangeLeft/ dollarCoins[i]);
          moneyCountArry.push(currentMoneyCount);
          totalChangeLeft = (totalChangeLeft - (currentMoneyCount* dollarCoins[i])+0.001);
          if (totalChangeLeft>=0){
            //count up animateValue(i, start, end, duration) 
            animateValue(i, 0, currentMoneyCount, 500);
            document.getElementById(billCoinWordsArr[i]+"-output").innerHTML= currentMoneyCount;
        }}}
          else{//thee customer did not give enough money
            document.getElementById("errorMessage").innerHTML="Customer owes you $"+ totalChangeDue.toFixed(2);
          }
          document.getElementById("cha-ching").play();     
    }
    function clearScrnBtnClick(){
      billCoinWordsArr.map(x => document.getElementById(x +"-output").innerHTML="");
      document.getElementById("output-total-due").innerHTML="";
      document.getElementById("amount-due").value="";
      document.getElementById("amount-received").value="";
      document.getElementById("errorMessage").innerHTML="";
    }
