import { Contract, ethers, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { abi, CARFACTORY_CONTRACT_ADDRESS } from "../constants";
import { CreateCarForm } from "./CreateCarForm";
import CarCard from "./CarCard";
import { AddAccident } from "./AddAccidents";
import { AddReparation } from "./AddReparation";
import { AddKilometers } from "./AddKilometers";
import { UploadImage } from "./UploadImage";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [carAddress, setCarAddress] = useState("");
  const [carMaker, setCarMaker] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carImages, setCarImages] = useState([]);
  const [carYear, setCarYear] = useState(0);
  const [carRegistrationDate, setRegistrationDate] = useState(0);
  const [countCars, setCount] = useState(0);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [canCreateCar, setCanCreateCar] = useState(false);
  const [carReparations, setCarReparations] = useState([]);
  const [carAccidents, setCarAccidents] = useState([]);
  const [canAddAccident, setAddAccident] = useState(false);
  const [canAddReparation, setAddReparation] = useState(false);
  const [canAddKilometers, setCanAddKilometers] = useState(false);
  const [canUploadImage, setCanUploadImage] = useState(false);
  const [kmsData, setKmsData] = useState(null);
  const [vectorYears, setVectorYears] = useState([]);
  const [vectorKms, setVectorKms] = useState([]);

  function processAccidentsArray(array) {
    const processedArray = [];
    for (let i = 0; i < array.length; i++) {
      let year;
      if (
        typeof array[i][1] === "object" &&
        array[i][1] !== null &&
        "_hex" in array[i][1]
      ) {
        // This is a BigNumber object
        year = ethers.BigNumber.from(array[i][1]._hex).toNumber();
      } else {
        // This is not a BigNumber object
        year = array[i][1];
      }
      const entry = {
        type: array[i][0],
        year: year,
        description: array[i][2],
      };
      processedArray.push(entry);
    }
    return processedArray;
  }

  const createDataObject = (years, kilometers) => {
    if (years.length !== kilometers.length) {
      throw new Error(
        "Los vectores years y kilometers deben tener la misma longitud",
      );
    }

    const data = years.map((year, index) => {
      return {
        year: year,
        kilometers: kilometers[index],
      };
    });

    return data;
  };
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      const signer = await getProviderOrSigner(true);
      const contractInstance = new Contract(
        CARFACTORY_CONTRACT_ADDRESS,
        abi,
        signer,
      );
      setContract(contractInstance);

      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error(err);
    }
  };

  //Para sacar el numerito con la cantidad de coches
  const fetchNumberOfCars = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const contract = new Contract(CARFACTORY_CONTRACT_ADDRESS, abi, provider);
      const carCount = (await contract.getNumberOfCars()).toNumber();
      setCount(carCount);
    } catch (err) {
      console.error(err);
    }
  };

  //Para poder acceder a los role based contracts necesito poner el signer a true
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    const initializeWeb3Modal = async () => {
      if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
          network: "mumbai",
          providerOptions: {},
          disableInjectedProvider: false,
        });

        await connectWallet();
        renderCreateCarForm();
        renderGarageForms();
      } else {
        // Fetch the number of cars when the wallet is connected
        fetchNumberOfCars();
      }
    };

    initializeWeb3Modal();
  }, [walletConnected]);

  const getCar = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const contract = new Contract(CARFACTORY_CONTRACT_ADDRESS, abi, provider);

      setCarAddress(await contract.getCarByLicensePlate(searchTerm));
      setCarMaker(await contract.getMaker(searchTerm));
      setCarYear((await contract.getYear(searchTerm)).toNumber());
      setCarModel(await contract.getModel(searchTerm));
      setRegistrationDate(
        (await contract.getRegistrationDate(searchTerm)).toNumber(),
      );
      setCarImages(await contract.getPhotosOfCar(searchTerm));
      console.log(await contract.getPhotosOfCar(searchTerm));
      setCarReparations(
        processAccidentsArray(await contract.getReparationOfCar(searchTerm)),
      );
      setCarAccidents(
        processAccidentsArray(await contract.getAccidentOfCar(searchTerm)),
      );
      let result = await contract.getKilometrajeHistory(searchTerm);
      let years = [];
      let kilometers = [];

      result[0].forEach((item) => {
        years.push(item.toNumber());
      });

      result[1].forEach((item) => {
        kilometers.push(item.toNumber());
      });

      setVectorKms(kilometers);
      setVectorYears(years);
      setKmsData(createDataObject(years, kilometers));
      setVectorYears(years);
      setVectorKms(kilometers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const connectWalletAndRenderSearch = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} variant="primary">
          Connect your wallet
        </button>
      );
    }

    if (walletConnected) {
      console.log("Conectada wallet");
      return (
        <div style={{ margin: "10px" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Matrícula del vehículo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduzca la matrícula"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") event.preventDefault();
                }}
              />
              <br />
              <Form.Text className="text-muted">
                Introduzca la matrícula del vehículo y presione el boton de
                busqueda.
              </Form.Text>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2 text-center">
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={getCar}
            >
              Buscar
            </Button>
          </div>
        </div>
      );
    }
  };

  const renderCarCard = () => {
    if (carAddress !== "") {
      if (
        carAddress === "0x0000000000000000000000000000000000000000" ||
        carAddress === ""
      ) {
        return <h1>Este vehiculo no existe o no esta registrado</h1>;
      } else {
        return (
          <CarCard
            carMaker={carMaker}
            carModel={carModel}
            carYear={carYear}
            carRegistrationDate={carRegistrationDate}
            carImage0={carImages[0]}
            carImage1={carImages[1]}
            carImage2={carImages[2]}
            carImage3={carImages[3]}
            carAddress={carAddress}
            carAccidents={carAccidents}
            carReparations={carReparations}
            kilometersData={kmsData}
          />
        );
      }
    }
  };

  const renderCreateCarForm = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const contractLocal = new Contract(
        CARFACTORY_CONTRACT_ADDRESS,
        abi,
        provider,
      );
      const isFactory = await contractLocal.isAFactory();
      const isAdmin = await contractLocal.isAADmin();
      setCanCreateCar(isFactory || isAdmin);
      setCanUploadImage(isFactory || isAdmin);
      console.log(canCreateCar);
    } catch (err) {
      console.error(err);
    }
  };

  const renderGarageForms = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const contractLocal = new Contract(
        CARFACTORY_CONTRACT_ADDRESS,
        abi,
        provider,
      );
      const isGarage = await contractLocal.isAGarage();
      console.log(isGarage);
      const isAdmin = await contractLocal.isAADmin();
      console.log(isAdmin);
      setAddAccident(isGarage || isAdmin);
      setAddReparation(isGarage || isAdmin);
      setCanAddKilometers(isGarage || isAdmin);
      console.log(canAddAccident);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container">
        <Head>
          <title>Caratche</title>
          <meta name="description" content="Caratche" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <div className="text-center">
            <h1>Welcome to Caratche</h1>
            <div className="m-10">
              We have {countCars} car{countCars !== 1 && "s"} in the chain
            </div>

            {connectWalletAndRenderSearch()}
          </div>
          {renderCarCard()}
          <div className="d-flex justify-content-between flex-wrap">
            {canCreateCar && (
              <CreateCarForm
                contractInstance={contract}
                account={account}
              />
            )}
            {canAddAccident && (
              <AddAccident contractInstance={contract} account={account} />
            )}
            {canAddReparation && (
              <AddReparation contractInstance={contract} account={account} />
            )}
            {canAddKilometers && (
              <AddKilometers contractInstance={contract} account={account} />
            )}

            {canUploadImage && (
              <UploadImage contractInstance={contract} account={account} />
            )}
          </div>
        </div>
      </div>
      <footer className="text-center text-white my-5">
        TFG Made by Daniel Asensi Roch
      </footer>
    </div>
  );
}
