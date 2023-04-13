// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Car.sol";

contract CarFactory {
    address[] public cars;
    mapping(string => address) public licensePlateToCar;
    Car actual;

    event NewCar(address indexed carAddress, string make, string model, uint year, string indexed licensePlate);

    function createCar(
        string memory _make,
        string memory _model,
        uint _year,
        string memory _licensePlate,
        uint _registrationDate,
        string[4] memory _photos
    ) public {
        Car newCar = new Car(_make, _model, _year, _licensePlate, _registrationDate, _photos);
        cars.push(address(newCar));
        licensePlateToCar[_licensePlate] = address(newCar);
        emit NewCar(address(newCar), _make, _model, _year, _licensePlate);
    }



    function getCarByLicensePlate(string memory _licensePlate) public view returns (address) {
        
        return licensePlateToCar[_licensePlate];
    }


    function getAllCars() public view returns(address[] memory) {
        return cars;
    }

    //Funciones para interactuar con los contratos hijos
    
    function getMaker(string memory _licensePlate)public view returns (string memory){
        return Car(address(licensePlateToCar[_licensePlate])).getMakerCar();
    }
    
    function getRegistrationDate(string memory _licensePlate)public view returns (uint){ 
      return Car(address(licensePlateToCar[_licensePlate])).getRegistrationDateCar();
    } 


    function getKilometrajeHistory(string memory _licensePlate)public view returns (uint[] memory){ 
      return Car(address(licensePlateToCar[_licensePlate])).getKilometrajeHistoryCar();
    }

    function getYear(string memory _licensePlate)public view returns (uint){
        return Car(address(licensePlateToCar[_licensePlate])).getYearCar();
    }

    function setRegistrationDate(string memory _licensePlate, uint _newRegistrationDate) public {
      Car(address(licensePlateToCar[_licensePlate])).setRegistrationDateCar(_newRegistrationDate);
    }
}
