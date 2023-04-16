// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./CarData.sol";

contract Car {
    string public make;
    string public model;
    uint public year;
    string public licensePlate;
    uint public registrationDate;
    address[] public ownerHistory;
    uint[] public kilometrajeHistory;
    address public actualOwner;

    CarData.Photos public photos;
    CarData.Repair[] public repairs;
    CarData.Accident[] public accidents;

    constructor(
        string memory _make,
        string memory _model,
        uint _year,
        string memory _licensePlate,
        uint _registrationDate,
        address _owner
    ) {
        make = _make;
        model = _model;
        year = _year;
        licensePlate = _licensePlate;
        registrationDate = _registrationDate;
        actualOwner = _owner;
        ownerHistory.push(_owner); // El creador del contrato se convierte en el primer dueño
    }
    
    function setPhotos(string memory p1, string memory p2, string memory p3, string memory p4) public{
      photos.frontalPhoto = p1;
      photos.rightSidePhoto = p2;
      photos.leftSidePhoto = p3;
      photos.backSidePhoto = p4;
    }

    function getPhotos() public view returns (CarData.Photos memory){
      return photos;
    }

    function setNewOwner(address newOwner) public{
      actualOwner = newOwner;
      ownerHistory.push(newOwner);
    }

    function getActualOwner() public view returns (address){
      return actualOwner;
    }


    function getNumberOfOwners() public view returns(uint){
      return ownerHistory.length;
    }


    function addOwnerCar(address newOwner) public {
        ownerHistory.push(newOwner);
    }

    
    //Funcion para devolver el modelo
    function getMakerCar() public view returns (string memory){
        return make;
    }
 
    function getModelCar() public view returns (string memory){
      return model;
    }
    //Funcion para anadir medida de kilometraje
    function addKilometrajeCar(uint newMileage) public {
        kilometrajeHistory.push(newMileage);
    }

    //Devolver las direcciones de todos los duenos
    function getOwnerHistoryCar() public view returns (address[] memory) {
        return ownerHistory;
    }

    //Devuelve el array con el historial de kilometrajes medidos
    function getKilometrajeHistoryCar() public view returns (uint[] memory) {
        return kilometrajeHistory;
    }

    //Devuelve el ano de creacion del coche
    function getYearCar() public view returns (uint){
        return year;
    }

    //Devuelve la fecha de matriculacion
    function getRegistrationDateCar() public view returns (uint) {
      return registrationDate;
    }
 
    //Cambia la fecha de matriculacion
    function setRegistrationDateCar(uint _newRegistrationDate) public {
      registrationDate = _newRegistrationDate;
    }

    //Funcion para anadir una reparacion 
    function addRepair(
        string memory _repairType,
        uint _repairDate,
        string memory _description
    ) public {
        repairs.push(CarData.Repair({repairType: _repairType, repairDate: _repairDate, description: _description}));
    }
    
    function getRepairs() public view returns (CarData.Repair[] memory) {
      return repairs;
    }


    //Funcion para anadir un accidente
    function addAccident(
        string memory _accidentType,
        uint _accidentDate,
        string memory _description
    ) public {
        accidents.push(CarData.Accident({accidentType: _accidentType, accidentDate: _accidentDate, description: _description}));
    }

    function getAccidents() public view returns (CarData.Accident[] memory) {
        return accidents;
    }
}
