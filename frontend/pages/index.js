import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { abi, CARFACTORY_CONTRACT_ADDRESS } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [carAddress, setCarAddress] = useState("");
  const [carMaker, setCarMaker] = useState("");
  const [carRegistrationDate, setRegistrationDate] = useState(0);
  const [carYear, setYear] = useState(0);

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

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
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected]);

  const getCar = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(CARFACTORY_CONTRACT_ADDRESS, abi, provider);

      setCarAddress(await contract.getCarByLicensePlate(searchTerm));
      console.log(carAddress);
      setCarMaker(await contract.getMaker(searchTerm));
      console.log(carMaker);
      setRegistrationDate(await contract.getRegistrationDate(searchTerm));
      console.log(carRegistrationDate);

      console.log(await contract.getKilometrajeHistory(searchTerm));
      console.log(await contract.getReparationOfCar(searchTerm));

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
      if (carAddress == "0x0000000000000000000000000000000000000000" || carAddress == "") {
        return <h1>This vehicle doesent exist or is not registered</h1>;
      } else {
        return (
          <Card className="text-center">
            <Card.Header>Fabricante: {carMaker}</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
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
      <Head>
        <title>Caratche</title>
        <meta name="description" content="Caratche" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <h1>Welcome to Caratche</h1>
          <div>Your car at the chain</div>
          {connectWalletAndRenderSearch()}
          {renderCarCard()}
        </div>
      </div>

      <footer>TFG Made by Daniel Asensi Roch</footer>
    </div>
  );
}
