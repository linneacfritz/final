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
createWorkBook();
setProv(args[0]);
//test(web3.eth.blockNumber);
startProgram(args[0]);
//printEvents();
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
      console.log('myEvent: ' + JSON.stringify(eventResult));
      //k = eventResult.args.r;
      var answers=[];
      console.log("\n Current block: " + currentBlock1 + " blocknumber: " + eventResult.blockNumber + '\n');
      if(currentBlock1!=eventResult.blockNumber){

        currentBlock1=eventResult.blockNumber;
        //k++;

        for(var i=0; i<3; i++){
        var res=myContract.getMatch.call(i, 2000000,{from: web3.eth.accounts[0]});
        answers[i]=parseInt(res);
        console.log("answer from call: " + res);
        //console.log("i= " +res );

      }
      var sorted = mergeSort(answers);
      console.log("sorted: " + sorted);
      myContract.query(0, 2000000, {from: web3.eth.accounts[0]});
    }
    else {
      console.log("same block number!");
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
        k=Math.floor(Math.random() * (10 - 1 + 1)) + 1;        //k++;
          myContract.response(k, 2000000, {from: web3.eth.accounts[0]});
        }
        else {
          console.log("same block number!");
        }
    }
  });
}

function mergeSort(arr)
{
  console.log("array: " + arr);
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
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());


console.log("result: " + result);
    return result;
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
  console.log("answer1:" + answer1);
  var answer2=0;

  if (answer1!=0){
    answer2=table(answer1, 1);
  }

  if (answer2!=0){
    console.log("answer 1: " + answer1 + " and answer 2: " + answer2);
    node_exists=true;
    var answers = [answer1, answer2];
    return answers;
  }
  else console.log("that node does not exist!");
};



























// const Web3 = require("/usr/lib/node_modules/web3");
// const web3 = new Web3();
// const fs = require('fs');
// const readline = require('readline');
// const ports=["http://localhost:8545",
// "http://localhost:8546",
// "http://localhost:8547",
// "http://localhost:8548",
// "http://localhost:8549",
// "http://localhost:8550",
// "http://localhost:8551",
// "http://localhost:8552",
// "http://localhost:8553",
// "http://localhost:8554"];
//
//
// var contractAddress = fs.readFileSync('/home/linnea/test1/test1_addressInfo.txt','utf8');
// var contractABI = fs.readFileSync('/home/linnea/test1/test1_abi.txt','utf8');
// var contract = web3.eth.contract(JSON.parse(contractABI));
// var myContract = contract.at(contractAddress);
// var workbook;
// var sheet_name_list;
// var node_exists = true;
// var counter =0;
// var args = process.argv.slice(2);
// var currentBlock1 =0;
// var currentBlock2 =0;
//
//
// function combination(h, s, a){
//   this.hardware=h;
//   this.software=s;
//   this.address=a;
// }
//
// module.exports = function(callback) {};
// createWorkBook();
// setProv(args[0]);
// startProgram(args[0]);
//
// function setProv(n){
//   web3.setProvider(new web3.providers.HttpProvider(ports[n-1]));
// }
//
// function startProgram(clientNumber){
//   if (clientNumber==1) {
//     process1(0);
//   }
//   else {
//     process2();
//   }
// }
//
// function process1(){
//   myContract.query(0, 2000000, {from: web3.eth.accounts[0]});
//   var responding = myContract.responding({}, {fromBlock: 'latest', toBlock: 'latest'});
//   responding.watch((error, eventResult) => {
//     if (error)
//     console.log('Error: ' + error);
//     else{
//       var answers=[];
//
//       //console.log("\n Current block: " + currentBlock1 + " blocknumber: " + eventResult.blockNumber + '\n');
//       //if(currentBlock1!=eventResult.blockNumber){
//         //currentBlock1=eventResult.blockNumber;
//
//         for(var i=0; i<5; i++){
//           var res=myContract.getMatch.call(i, 2000000,{from: web3.eth.accounts[0]});
//           var combo=new combination(parseInt(res[0]), parseInt(res[1]), res[2]);
//           answers[i]=combo;
//         }
//
//         var sorted = mergeSort(answers);
//         // for(var i = 0; i<5; i++){
//         //   console.log(sorted[i].hardware + ", " + sorted[i].software + ", " + sorted[i].address);
//         // }
//
//         myContract.query(0, 2000000, {from: web3.eth.accounts[0]});
//       //}
//       //else {
//         //console.log("same block number!");
//       //}
//     }
//   });
// }
//
// function process2(){
//   var asking = myContract.asking({}, {fromBlock: 'latest', toBlock: 'latest'});
//   asking.watch((error, eventResult) => {
//     if (error)
//     console.log('Error: ' + error);
//     else{
//       console.log('myEvent: ' + JSON.stringify(eventResult) + '\n');
//       n = eventResult.args.q;
//       //console.log("\n Current block: " + currentBlock2 + " blocknumber: " + eventResult.blockNumber + '\n');
//       if(currentBlock2!=eventResult.blockNumber){
//         currentBlock2=eventResult.blockNumber;
//         //k=Math.floor(Math.random() * (10 - 1 + 1)) + 1;        //k++;
//         ans = matchingAlgo(n)
//         myContract.response(ans[0], ans[1], 2000000, {from: web3.eth.accounts[0]});
//       }
//       else {
//         console.log("same block number!");
//       }
//     }
//   });
// }
//
// function mergeSort(arr)
// {
//   if (arr.length < 2)
//   return arr;
//
//   var middle = parseInt(arr.length / 2);
//   var left   = arr.slice(0, middle);
//   var right  = arr.slice(middle, arr.length);
//
//   return merge(mergeSort(left), mergeSort(right));
// }
//
// function merge(left, right)
// {
//   var result = [];
//
//   while (left.length && right.length) {
//     if (left[0].hardware <= right[0].hardware) {
//       result.push(left.shift());
//     } else {
//       result.push(right.shift());
//     }
//   }
//
//   while (left.length)
//   result.push(left.shift());
//
//   while (right.length)
//   result.push(right.shift());
//   return result;
// }
//
//
//
// function createWorkBook(){
//   if (typeof require !== 'undefined') XLSX = require('/usr/lib/node_modules/xlsx');
//   workbook = XLSX.readFile('/home/linnea/callback/out.ods');
//   sheet_name_list = workbook.SheetNames;
// }
//
// function table(id, sheet_number){
//   //this needs to be hardcoded to avoid extra computations
//   var worksheet = workbook.Sheets[sheet_name_list[sheet_number]];
//   var range = worksheet['!ref'];
//   var myRange = XLSX.utils.decode_range(range);
//   var end = myRange.e.r;
//   for(var i=1; i<=end; i++){
//     var row = 'A'+i;
//     var value = worksheet[row].v;
//     if(value == id){
//       console.log("value: " + value);
//       return (worksheet['B'+i].v);
//     }
//   }
//   return 0;
// }
//
// function matchingAlgo(number){
//   //console.log("looking for number: " + number);
//   var answer1 = table(number, 0);
//   //console.log("answer1:" + answer1);
//   //var answer2=0;
//
//   //if (answer1!=0){
//   var answer2=table(answer1, 1);
//   //}
//
//   //if (answer2!=0){
//   //console.log("answer 1: " + answer1 + " and answer 2: " + answer2);
//   //node_exists=true;
//   var answers = [answer1, answer2];
//   return answers;
//   //}
//   //else console.log("that node does not exist!");
// };
