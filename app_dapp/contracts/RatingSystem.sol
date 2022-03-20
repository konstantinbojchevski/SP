// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./RatingSystemInterface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RatingSystem is RatingSystemInterface {

  mapping(address => User) public users;

  address public admin;
  Counters.Counter rateCount;
  Rating[] public ratings;

  struct User {
    bool isRegistered;
  }

  function registerUser(address _userAddress) public onlyAdmin {
    require(
      !users[_userAddress].isRegistered,
      "user already registered"
    );
    users[_userAddress].isRegistered = true;
    emit RegisterUserEvent(_userAddress);
  }

  function add( string memory dogn, uint8 rating) public payable onlyRegisteredUser returns(bool)  {

    Rating memory novrating = Rating({
      dogName: dogn,
      rating: rating
    });

    ratings.push(novrating);
    Counters.increment(rateCount);
    emit NewRating(novrating);
    return true;
  }

  function getRatingCount() public view returns (uint256) {
      return Counters.current(rateCount);
  }

  function getAverageRating() public view returns (uint256) {
    uint sum;
    uint counter= getRatingCount();

    for(uint i = 0; i < counter; i++) {
      sum += ratings[i].rating;
    }
    return sum / counter;
  }

  function isRegistered(address _addr) public view returns(bool) {
    return users[_addr].isRegistered;
  }

  function getRating(uint i) public view returns(Rating memory) {
    return ratings[i];
  }

  function isAdmin(address _addr) public view returns(bool) {
    return _addr == admin;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, "Function must be called by admin");
    _;

  }

  modifier onlyRegisteredUser() {
    require(
      users[msg.sender].isRegistered,
      "Function must be called by registered user"
    );
    _;
  }

  constructor() {
    admin = msg.sender;
    registerUser(admin);
  }

  event NewRating(Rating rating);
  event RegisterUserEvent(address userAddress);

}