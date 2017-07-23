const Web3 = require("/usr/lib/node_modules/web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const fs = require('fs');
const solc = require('/usr/lib/node_modules/solc');
const input = fs.readFileSync('/home/linnea/test2/Test2.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Test2'].bytecode;
const abi = JSON.parse(output.contracts[':Test2'].interface);
var contract = web3.eth.contract(abi);



const Match = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.accounts[0],
    gas: 500000*2
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    if (res.address) {
        console.log('Contract address: ' + res.address);
        fs.writeFile("/home/linnea/test2/test2_abi.txt", JSON.stringify(abi) , function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The ABI file was saved!");
        });
        fs.writeFile("/home/linnea/test2/test2_addressInfo.txt", res.address, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The address file was saved!");
        });
    }
});
