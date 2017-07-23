pragma solidity ^0.4.9;

contract Test2{


  function Test2() payable {
  }

  struct Comp{
    uint hardware;
    uint software;
  }

  Comp[] matches;
  event asking (address sender, uint q);
  event responding ();


  function query(uint q){
    delete matches;
    asking(msg.sender, q);
  }

  function response(uint h, uint s){
    matches.push(Comp(h, s));
    if (matches.length>3){
      responding();
    }
  }

  function getMatch(uint m) returns (uint, uint){
    return (matches[m].hardware, matches[m].software);
  }
}
