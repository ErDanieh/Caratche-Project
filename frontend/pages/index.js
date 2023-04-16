import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { abi, CARFACTORY_CONTRACT_ADDRESS } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [carAddress, setCarAddress] = useState("");
  const [carMaker, setCarMaker] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carRegistrationDate, setRegistrationDate] = useState(0);
  const [carYear, setYear] = useState(0);
  const [countCars, setCount] = useState(0);

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchNumberOfCars = async () => {
    try {
      const provider = await getProviderOrSigner(true);
      const contract = new Contract(CARFACTORY_CONTRACT_ADDRESS, abi, provider);
      const carCount = (await contract.getNumberOfCar()).toNumber();
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
      console.log("Contrato del coche: " + carAddress);
      setCarMaker(await contract.getMaker(searchTerm));
      console.log("Marca del coche: " + carMaker);
      setRegistrationDate(await contract.getRegistrationDate(searchTerm));
      console.log("Fecha de registro: " + carRegistrationDate);

      console.log("Todos los coches: " + await contract.getAllCars());
      console.log(
        "Historial de kilometraje: " +
          await contract.getKilometrajeHistory(searchTerm),
      );
      console.log(
        "Historial de reparaciones: " +
          await contract.getReparationOfCar(searchTerm),
      );
      console.log(
        "Historial de accidentes: " +
          await contract.getAccidentOfCar(searchTerm),
      );
      console.log(
        "Fotos del vehiculo: " + await contract.getPhotosOfCar(searchTerm),
      );
      console.log(
        "Dueno actual del vehiculo" +
          await contract.getActualOwnerOfCar(searchTerm),
      );

      console.log((await contract.getNumberOfCar()).toNumber());
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
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }

    if (walletConnected) {
      console.log("Conectada wallet");
      return (
        <div>
          <Form
            onSubmit={handleSubmit}
          >
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
          <Button
            variant="primary"
            type="submit"
            onClick={getCar}
          >
            Buscar
          </Button>
        </div>
      );
    }
  };

  const renderCarCard = () => {
    if (carAddress != "") {
      if (
        carAddress == "0x0000000000000000000000000000000000000000" ||
        carAddress == ""
      ) {
        return <h1>This vehicle doesent exist or is not registered</h1>;
      } else {
        return (
          <Card className="text-center">
            <Card.Header>Fabricante: {carMaker}</Card.Header>
            <Card.Body>
              <Card.Title>Fabricante: {carMaker}, Modelo: {}</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              Contract address: {carAddress}
            </Card.Footer>
          </Card>
        );
      }
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
          <div>
            <h1>Welcome to Caratche</h1>
            <div>
              We have {countCars} car{countCars !== 1 && "s"} in the chain
            </div>
            {connectWalletAndRenderSearch()}
            {renderCarCard()}
          </div>
        </div>
      </div>
      <footer className="text-center text-white my-5">
        TFG Made by Daniel Asensi Roch
      </footer>
    </div>
  );
}
