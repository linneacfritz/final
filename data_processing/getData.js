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


//var contractAddress = fs.readFileSync('/home/linnea/test1/test1_addressInfo.txt','utf8');
//var contractABI = fs.readFileSync('/home/linnea/test1/test1_abi.txt','utf8');
//var contract = web3.eth.contract(JSON.parse(contractABI));
//var myContract = contract.at(contractAddress);
var args = process.argv.slice(2);
//var currentBlock1 =0;
//var currentBlock2 =0;
var logFile = '/home/linnea/data_processing/logFile.txt'


module.exports = function(callback) {};

setProv(args[0]);


function Combination(h, s, a){
  this.hardware=h;
  this.software=s;
  this.address=a;
}

function setProv(n){
  web3.setProvider(new web3.providers.HttpProvider(ports[n-1]));
}

findLogs();



function findLogs(){
  var counter = 0;
  for (var i = 5617; i<10804; i++){
    web3.eth.getBlock(i, true, function(error, block){
      //if(!error){
      //if (result.gasUsed>0){
      //counter++;}
      //fs.appendFileSync(logFile, '\n\n'+JSON.stringify(result));
      //fs.appendFileSync(logFile, '\n' + result.timestamp);
      //fs.appendFileSync(logFile, '\n COUNTER: ' + counter);
      if(block.transactions.length>0){
        counter++;
        fs.appendFileSync(logFile, (
          '\n--------------------------------------------------------------------------------------------------------\n'
          //+'\n\n'+JSON.stringify(block)
          + "Counter:         : " + counter+'\n'
          + "Block number     : " + block.number + "\n"
          + " hash            : " + block.hash + "\n"
          + " parentHash      : " + block.parentHash + "\n"
          + " nonce           : " + block.nonce + "\n"
          + " sha3Uncles      : " + block.sha3Uncles + "\n"
          + " logsBloom       : " + block.logsBloom + "\n"
          + " transactionsRoot: " + block.transactionsRoot + "\n"
          + " stateRoot       : " + block.stateRoot + "\n"
          + " miner           : " + block.miner + "\n"
          + " difficulty      : " + block.difficulty + "\n"
          + " totalDifficulty : " + block.totalDifficulty + "\n"
          + " extraData       : " + block.extraData + "\n"
          + " size            : " + block.size + "\n"
          + " gasLimit        : " + block.gasLimit + "\n"
          + " gasUsed         : " + block.gasUsed + "\n"
          + " timestamp       : " + block.timestamp + "\n"
          + " transactions    : " + JSON.stringify(block.transactions) + "\n"
          + " uncles          : " + block.uncles) + '\n');
          //if (block.transactions != null) {
          //console.log("--- transactions ---");
          //block.transactions.forEach( function(e) {
          //printTransaction(e);
        }
      })
    }
  }
