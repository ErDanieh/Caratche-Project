  const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // Address of the whitelist contract that you deployed in the previous module
  // URL from where we can extract the metadata for a Crypto Dev NFT
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
  */
  const CarFactoryContract = await ethers.getContractFactory("CarFactory");

  // deploy the contract
  const deployedCarFactoryContract = await CarFactoryContract.deploy();

  // Wait for it to finish deploying
  await deployedCarFactoryContract.deployed();

  // print the address of the deployed contract
  console.log(
    "CarFactory contract address:",
    deployedCarFactoryContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
