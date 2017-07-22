pragma solidity ^0.4.9;

contract Test3{


  function Test3() payable {
  }

  struct Comp{
    int hardware;
    int software;
  }

  Comp[] matches;
  event asking (address sender, uint q);
  event responding ();


  function query(uint q){
    delete matches;
    asking(msg.sender, q);
  }

  function response(int h, int s){
    matches.push(Comp(h, s));
    if (matches.length>3){
      responding();
    }
  }

  function getMatch(uint m) returns (int, int){
    return (matches[m].hardware, matches[m].software);
  }
}
