const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const CarFactoryContract = await ethers.getContractFactory("CarFactory");

  // deploy the contract
  const deployedCarFactoryContract = await CarFactoryContract.deploy();

  // Wait for it to finish deploying
  await deployedCarFactoryContract.deployed();

  // If contract is not being deployed to the localhost network, verify.

  console.log("Verifying contract, waiting 6 tx for propagation...");

  await deployedCarFactoryContract.deployTransaction.wait(6);

  await hre.run("verify:verify", {
    address: deployedCarFactoryContract.address,
    constructorArguments: [],
  });

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
