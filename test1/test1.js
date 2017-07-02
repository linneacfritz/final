const Web3 = require("/usr/lib/node_modules/web3");
const web3 = new Web3();
const fs = require('fs');
const readline = require('readline');
const ports=["http://localhost:8545",
"http://localhost:8546",
"http://localhost:8547",
"http://localhost:8548",
"http://localhost:8549",
"http://localhost:8550",
"http://localhost:8551",
"http://localhost:8552",
"http://localhost:8553",
"http://localhost:8554"];


var contractAddress = fs.readFileSync('/home/linnea/test1/test1_addressInfo.txt','utf8');
var contractABI = fs.readFileSync('/home/linnea/test1/test1_abi.txt','utf8');
var contract = web3.eth.contract(JSON.parse(contractABI));
var myContract = contract.at(contractAddress);
var workbook;
var sheet_name_list;
var node_exists = true;
var counter =0;
var args = process.argv.slice(2);
var currentBlock1 =0;
var currentBlock2 =0;


module.exports = function(callback) {};
//startTimer();
createWorkBook();
setProv(args[0]);
//test(web3.eth.blockNumber);
startProgram(args[0]);
//waitThreeSeconds();
function Combination(h, s, a){
  this.hardware=h;
  this.software=s;
  this.address=a;
}

// answers[0] = new Combination(4, 3, 1);
// answers[1] = new Combination(4, 5, 6);
// answers[2] = new Combination(5, 5, 5);
// answers[3] = new Combination(5, 5, 5);
// answers[4] = new Combination(1, 2, 3);
// answers[5] = new Combination(5, 5, 5);
// answers[6] = new Combination(9, 88, 15);
// answers[7] = new Combination(9, 5, 9);
// answers[8] = new Combination(9, 1, 1);
// answers[9] = new Combination(9, 2, 2);

// var answers = mergeSort(answers);
// console.log(answers);
//
// console.log(findBestCombination());

function setProv(n){
  web3.setProvider(new web3.providers.HttpProvider(ports[n-1]));
}

function startProgram(clientNumber){
  if (clientNumber==1) {
    process1(0);
  }
  else {
    process2();
  }
}

function process1(){
  myContract.query(0, 2000000, {from: web3.eth.accounts[0]});
  var responding = myContract.responding({}, {fromBlock: 'latest', toBlock: 'latest'});
  responding.watch((error, eventResult) => {
    if (error)
    console.log('Error: ' + error);
    else{
      console.log('myEvent: ' + JSON.stringify(eventResult)+ '\n');
      console.log("\n Current block: " + currentBlock1 + " blocknumber: " + eventResult.blockNumber + '\n');
      if(currentBlock1!=eventResult.blockNumber){

        currentBlock1=eventResult.blockNumber;
        var answers=[];
        for(var i=0; i<4; i++){
          var res=myContract.getMatch.call(i, 2000000,{from: web3.eth.accounts[0]});
          answers[i]=new Combination (parseInt(res[0]), parseInt(res[1]), res[2]);
        }
        console.log("Answers: " + JSON.stringify(answers) + '\n');
        answers = mergeSort(answers);
        findBestCombination(answers);

        myContract.query(0, 2000000, {from: web3.eth.accounts[0]});
      }
      else {
        console.log("same block number!");
        waitTwentySeconds();
      }
    }
  });
}


function process2(){
  var asking = myContract.asking({}, {fromBlock: 'latest', toBlock: 'latest'});
  asking.watch((error, eventResult) => {
    if (error)
    console.log('Error: ' + error);
    else{
      console.log('myEvent: ' + JSON.stringify(eventResult) + '\n');
      k = eventResult.args.q;
      console.log("\n Current block: " + currentBlock2 + " blocknumber: " + eventResult.blockNumber + '\n');
      if(currentBlock2!=eventResult.blockNumber){
        currentBlock2=eventResult.blockNumber;
        k=matchingAlgo(k)
        myContract.response(k, 0, 2000000, {from: web3.eth.accounts[0]});
      }
      else {
        console.log("same block number!");
      }
    }
  });
}

function createWorkBook(){
  if (typeof require !== 'undefined') XLSX = require('/usr/lib/node_modules/xlsx');
  workbook = XLSX.readFile('/home/linnea/callback/out.ods');
  sheet_name_list = workbook.SheetNames;
}

function table(id, sheet_number){
  //this needs to be hardcoded to avoid extra computations
  var worksheet = workbook.Sheets[sheet_name_list[sheet_number]];
  var range = worksheet['!ref'];
  var myRange = XLSX.utils.decode_range(range);
  var end = myRange.e.r;
  for(var i=1; i<=end; i++){
    var row = 'A'+i;
    var value = worksheet[row].v;
    if(value == id){
      console.log("value: " + value);
      return (worksheet['B'+i].v);
    }
  }
  return 0;
}

function matchingAlgo(number){
  var answer1 = table(number, 0);
  //console.log("answer1:" + answer1);
  //var answer2=0;

  //if (answer1!=0){
  //answer2=table(answer1, 1);
  //}

  //if (answer2!=0){
  //console.log("answer 1: " + answer1 + " and answer 2: " + answer2);
  //node_exists=true;
  //var answers = [answer1, answer2];
  //return answers;
  return answer1;
  //}
  //else console.log("that node does not exist!");
};

function mergeSort(arr)
{
  //console.log(arr[0].hardware + " " + arr[0].software + " " + arr[0].address)
  if (arr.length < 2)
  return arr;

  var middle = parseInt(arr.length / 2);
  var left   = arr.slice(0, middle);
  var right  = arr.slice(middle, arr.length);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
  var result = [];

  while (left.length && right.length) {
    if (left[0].hardware <= right[0].hardware) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length)
  result.push(left.shift());

  while (right.length)
  result.push(right.shift());

  //console.log("results: " + result[0].hardware + " " + result[0].software + " " + result[0].address);

  return result;
}

function startTimer(){
  var time1 =  Date.now();
  console.log("the time is: " + time1);
  var time2 = Date.now();
  console.log(" ...and now it's: " + time2);
  console.log(" time elapsed between 1 and 2: " + (time2-time1));
}


function findBestCombination(answers)
{
  var count = 1;
  var tempCount;
  var bestCombo = answers[0];
  var tempCombo = 0;

  for (var i = 0; i < answers.length ; i++)
  {
    tempCombo = answers[i];
    tempCount = 0;
    for (var j = 1; j < answers.length; j++)
    {
      if (tempCombo.hardware == answers[j].hardware)
      tempCount++;
    }
    if (tempCount > count)
    {
      bestCombo=tempCombo;
      count = tempCount;
    }
  }
  console.log("bestCombo: " + bestCombo.hardware + ", " + bestCombo.software + ", " + bestCombo.address + 'n');

}





function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function waitTwentySeconds(){
sleep(20000).then(() => {
      process1();
});
}
