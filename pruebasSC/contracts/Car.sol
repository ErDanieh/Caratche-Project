// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Car {
    string public make;
    string public model;
    uint public year;
    string public licensePlate;
    uint public registrationDate;
    address[] public ownerHistory;
    uint[] public mileageHistory;
    string[4] public photos;

    constructor(
        string memory _make,
        string memory _model,
        uint _year,
        string memory _licensePlate,
        uint _registrationDate,
        string[4] memory _photos
    ) {
        make = _make;
        model = _model;
        year = _year;
        licensePlate = _licensePlate;
        registrationDate = _registrationDate;
        photos = _photos;
        ownerHistory.push(msg.sender); // El creador del contrato se convierte en el primer dueño
    }

    function addOwner(address newOwner) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede transferir la propiedad.");
        ownerHistory.push(newOwner);
    }

    function addMileage(uint newMileage) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede agregar kilometraje.");
        mileageHistory.push(newMileage);
    }

    function getOwnerHistory() public view returns (address[] memory) {
        return ownerHistory;
    }

    function getMileageHistory() public view returns (uint[] memory) {
        return mileageHistory;
    }

    function getYear() public view returns (uint){
        return year;
    }
}
