export const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "carAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "make",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "model",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "year",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "licensePlate",
          "type": "string"
        }
      ],
      "name": "NewCar",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_accidentType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_accidentDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "addAccidenteToCar",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_repairType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_repairDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "addRepairToCar",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cars",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_make",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_model",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_year",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_registrationDate",
          "type": "uint256"
        },
        {
          "internalType": "string[4]",
          "name": "_photos",
          "type": "string[4]"
        }
      ],
      "name": "createCar",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCars",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        }
      ],
      "name": "getCarByLicensePlate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        }
      ],
      "name": "getKilometrajeHistory",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        }
      ],
      "name": "getMaker",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        }
      ],
      "name": "getRegistrationDate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        }
      ],
      "name": "getYear",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "licensePlateToCar",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_licensePlate",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_newRegistrationDate",
          "type": "uint256"
        }
      ],
      "name": "setRegistrationDate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export const CARFACTORY_CONTRACT_ADDRESS = "0xEe7C5826C4b249C51Be8BE9a1e8EB9Ed29fa21b7"
