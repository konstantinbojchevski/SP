// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface RatingSystemInterface {

    struct Rating {
        string dogName;
        uint8 rating;
    }

    function registerUser(address _userAddress) external;
    function add(string memory dogn, uint8 rating) payable external returns(bool);
    function getAverageRating() external returns(uint256);
    function getRatingCount() external returns (uint256);
    function isRegistered(address _naslov) external returns(bool);
    function getRating(uint indeks) external returns(Rating memory);
    function isAdmin(address _addr) external returns(bool);
}