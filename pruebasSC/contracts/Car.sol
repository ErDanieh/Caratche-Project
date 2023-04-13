// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Car {
    string public make;
    string public model;
    uint public year;
    string public licensePlate;
    uint public registrationDate;
    address[] public ownerHistory;
    uint[] public kilometrajeHistory;
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

    function addOwnerCar(address newOwner) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede transferir la propiedad.");
        ownerHistory.push(newOwner);
    }

    
    //Funcion para devolver el modelo
    function getMakerCar() public view returns (string memory){
        return make;
    }
 
    //Funcion para anadir medida de kilometraje
    function addKilometrajeCar(uint newMileage) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede agregar kilometraje.");
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

}
