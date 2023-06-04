// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./CarData.sol";
import "./Car.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract CarFactory is AccessControl {
    address[] public cars;
    mapping(string => address) public licensePlateToCar;
    Car actual;

    event NewCar(address indexed carAddress, string make, string model, uint year, string indexed licensePlate);

    //Role para creadores de automoviles y matriculadoras
    bytes32 public constant CARFACTORY_ROLE = keccak256("CARFACTORY_ROLE");
    //Role para garages y ITVs 
    bytes32 public constant GARAGE_ROLE = keccak256("GARAGE_ROLE");

    bytes32 public constant SYSADMIN_ROLE = keccak256("SYSADMIN_ROLE");

    constructor() {
      // Asigna el rol CARFACTORY_ROLE al creador del contrato
      _setupRole(CARFACTORY_ROLE, msg.sender);
      // Asigna el rol GARAGE_ROLE al creador del contrato
      _setupRole(GARAGE_ROLE, msg.sender);

      _setupRole(SYSADMIN_ROLE, msg.sender);
    }
    
    function isAFactory() public view returns (bool){
      return hasRole(CARFACTORY_ROLE, msg.sender);
    }

    function isAGarage() public view returns (bool){
     return hasRole(GARAGE_ROLE, msg.sender); 
    }

    function isAADmin() public view returns (bool){
     return hasRole(SYSADMIN_ROLE, msg.sender); 
    }


    function grantRoleFactory(address _address) public {
      grantRole(CARFACTORY_ROLE, _address);
    }

    function grantRoleGarage(address _address) public {
      grantRole(GARAGE_ROLE, _address);
    }

    function grantRoleAdmin(address _address) public {
      grantRole(SYSADMIN_ROLE, _address);
    }

    function createCar(
        string memory _make,
        string memory _model,
        uint _year,
        string memory _licensePlate,
        uint _registrationDate,
        address _walletOfOwner
    ) public {
        require(hasRole(CARFACTORY_ROLE, msg.sender)|| hasRole(SYSADMIN_ROLE,msg.sender), "You can not create a Car");

        if(licensePlateToCar[_licensePlate] != address(0)){
            revert("Car already exists");
        }

        Car newCar = new Car(_make, _model, _year, _licensePlate, _registrationDate, _walletOfOwner);
        cars.push(address(newCar));
        licensePlateToCar[_licensePlate] = address(newCar);
        emit NewCar(address(newCar), _make, _model, _year, _licensePlate);
    }

    function getCarByLicensePlate(string memory _licensePlate) public view returns (address) {
        
        return licensePlateToCar[_licensePlate];
    }
    

    // Función para obtener todas las matrículas de los coches
    function getAllLicensePlates() public view returns (string[] memory) {

      require(hasRole(CARFACTORY_ROLE, msg.sender)|| hasRole(SYSADMIN_ROLE,msg.sender), "You can not get all the licensePlates");
      
      string[] memory licensePlates = new string[](cars.length);
        for (uint i = 0; i < cars.length; i++) {
            Car car = Car(cars[i]);
            licensePlates[i] = car.licensePlate();
        }
        
        return licensePlates;
    }

    function getNumberOfCars() public view returns (uint){
      return cars.length;
    }


  function deleteCar(string memory _licensePlate) public {
      require(hasRole(SYSADMIN_ROLE,msg.sender), "You can not delete a Car");
      address carAddress = licensePlateToCar[_licensePlate];
      
      uint index = cars.length; // If car is not found this will remain as is and we will remove nothing.
      for (uint i = 0; i < cars.length; i++) {
          if (cars[i] == carAddress) {
              index = i;
              break;
          }
      }
      
      if (index < cars.length) { // If car was found in the list
          // Move the last element to the place of the one to delete
          cars[index] = cars[cars.length - 1];
          // Now we can decrease the size of the list by one
          cars.pop();
      }

      delete licensePlateToCar[_licensePlate];
  }


    //Funciones para interactuar con los contratos hijos 

    //*************************Funciones para usuarios publicos****************************************
    function getMaker(string memory _licensePlate)public view returns (string memory){
        return Car(address(licensePlateToCar[_licensePlate])).getMakerCar();
    }

    function getModel(string memory _licensePlate)public view returns (string memory){
        return Car(address(licensePlateToCar[_licensePlate])).getModelCar();
    }
    
    function getRegistrationDate(string memory _licensePlate)public view returns (uint){ 
      return Car(address(licensePlateToCar[_licensePlate])).getRegistrationDateCar();
    } 


    function getKilometrajeHistory(string memory _licensePlate)public view returns (uint[] memory,uint[] memory){ 
      return Car(address(licensePlateToCar[_licensePlate])).getKilometrajeHistoryAll();
    }

    function getYear(string memory _licensePlate)public view returns (uint){
        return Car(address(licensePlateToCar[_licensePlate])).getYearCar();
    }

    function getReparationOfCar(string memory _licensePlate) public view returns (CarData.Repair[] memory){
        CarData.Repair[] memory repairs = Car(address(licensePlateToCar[_licensePlate])).getRepairs();
        return repairs;
    }

    function getAccidentOfCar(string memory _licensePlate) public view returns (CarData.Accident[] memory){
        CarData.Accident[] memory accidents = Car(address(licensePlateToCar[_licensePlate])).getAccidents();
        return accidents;
    }

    function getActualOwnerOfCar(string memory _licensePlate) public view returns(address){
      return Car(address(licensePlateToCar[_licensePlate])).getActualOwner();
    }

    function getPhotosOfCar(string memory _licensePlate) public view returns(string[] memory){
      CarData.Photos memory p = Car(address(licensePlateToCar[_licensePlate])).getPhotos();
      string[] memory re = new string[](4);
      re[0] = p.frontalPhoto;
      re[1] = p.rightSidePhoto;
      re[2] = p.leftSidePhoto;
      re[3] = p.backSidePhoto;

      return re;
    }


    //setters
    function setPhotosOfCar(string memory _licensePlate,string memory p1, string memory p2, string memory p3, string memory p4) public{
      require(hasRole(CARFACTORY_ROLE, msg.sender)|| hasRole(SYSADMIN_ROLE,msg.sender), "You are not a CarFactory");
       Car(address(licensePlateToCar[_licensePlate])).setPhotos(p1,p2,p3,p4);
    }


    function setNewOwnerOfCar(string memory _licensePlate, address _newOwner) public {
      require(Car(address(licensePlateToCar[_licensePlate])).getActualOwner() == msg.sender);
        Car(address(licensePlateToCar[_licensePlate])).setNewOwner(_newOwner); 
    }

    function setRegistrationDate(string memory _licensePlate, uint _newRegistrationDate) public {
      require(hasRole(CARFACTORY_ROLE, msg.sender)|| hasRole(SYSADMIN_ROLE,msg.sender), "You are not a CarFactory");
      Car(address(licensePlateToCar[_licensePlate])).setRegistrationDateCar(_newRegistrationDate);
    }

    //*********************************Private role functions*********************************************
    function getAllCars() public view returns(address[] memory) {
      require(hasRole(SYSADMIN_ROLE, msg.sender), "You can get all the cars");
        return cars;
    }

    //Anyade una nueva reparacion a un coche
    function addRepairToCar(
        string memory _licensePlate,
        string memory _repairType,
        uint _repairDate,
        string memory _description
    ) public {
        require(hasRole(GARAGE_ROLE,msg.sender) || hasRole(SYSADMIN_ROLE,msg.sender), "You need to be a garage");
        Car(address(licensePlateToCar[_licensePlate])).addRepair(_repairType, _repairDate, _description);
    }

    //Anyade un nuevo accidente a un coche
    function addAccidenteToCar(
        string memory _licensePlate,
        string memory _accidentType,
        uint _accidentDate,
        string memory _description
    ) public {
        require(hasRole(GARAGE_ROLE, msg.sender) || hasRole(SYSADMIN_ROLE,msg.sender), "You need to be a garage");
        Car(address(licensePlateToCar[_licensePlate])).addAccident(_accidentType, _accidentDate, _description);
    }

    //Anyade un nuevo kilometraje a un coche
    function addKilometrajeToCar(string memory _licensePlate, uint _year, uint _km) public{
      require(hasRole(GARAGE_ROLE, msg.sender) || hasRole(SYSADMIN_ROLE,msg.sender), "You need to be a garage");
      Car(address(licensePlateToCar[_licensePlate])).addKilometrajeCar(_year, _km);
    }
}
