// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Car {
    string public make;
    string public model;
    uint public year;
    string public licensePlate; // Agregar la variable licensePlate

    constructor(string memory _make, string memory _model, uint _year, string memory _licensePlate) {
        make = _make;
        model = _model;
        year = _year;
        licensePlate = _licensePlate; // Inicializar la variable licensePlate
    }
}


contract CarFactory{
  address[] public cars;
  // Mapeo de matrícula a dirección del contrato Car
  mapping (string=>address) public licensePlateToCar;

  event NewCar(address indexed carAddress, string make, string model, uint year, string indexed licensePlate);

  function createCar(string memory _make, string memory _model, uint _year, string memory _licensePlate) public {
    Car newCar = new Car(_make, _model, _year, _licensePlate);
    cars.push(address(newCar));
    licensePlateToCar[_licensePlate] = address(newCar); // Asociar la matrícula con la dirección del contrato Car
    emit NewCar(address(newCar), _make, _model, _year, _licensePlate); // Agregar licensePlate al evento
  }
    // Función para obtener la dirección del contrato Car a partir de la matrícula
  function getCarByLicensePlate(string memory _licensePlate) public view returns(address) {
     return licensePlateToCar[_licensePlate];
  }

  function getAllCars() public view returns(address[] memory){
    returns cars;
  }

}

 
