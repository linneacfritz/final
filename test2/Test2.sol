pragma solidity ^0.4.9;

contract Test2{


  function Test2() payable {
  }

  struct Comp{
    uint hardware;
    uint software;
    address sender;
  }

  Comp[] matches;
  event asking (address sender, uint q);
  event responding ();


  function query(uint q){
    delete matches;
    asking(msg.sender, q);
  }

  function response(uint h, uint s){
    matches.push(Comp(h, s, msg.sender));
    if (matches.length>4){
      responding();
    }
  }

  function getMatch(uint m) returns (uint, uint, address){
    return (matches[m].hardware, matches[m].software, matches[m].sender);
  }
}
