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

    struct Accident {
      string accidentType;
      uint accidentDate;
      string description;
    }

    Accident[] public accidents;

    struct Repair {
        string repairType;
        uint repairDate;
        string description;
    }

    Repair[] public repairs;

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

    function addRepair(
        string memory _repairType,
        uint _repairDate,
        string memory _description
    ) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede agregar reparaciones.");
        repairs.push(Repair({repairType: _repairType, repairDate: _repairDate, description: _description}));
    }

    function getRepairs() public view returns (Repair[] memory) {
        return repairs;
    }

    function addAccident(
        string memory _accidentType,
        uint _accidentDate,
        string memory _description
    ) public {
        require(msg.sender == ownerHistory[ownerHistory.length - 1], "Solo el owner actual puede agregar reparaciones.");
        accidents.push(Accident({accidentType: _accidentType, accidentDate: _accidentDate, description: _description}));
    }

    function getAccidents() public view returns (Accident[] memory) {
        return accidents;
    }
}
