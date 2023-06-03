import EventCard from "./EventCard";
import Card from "react-bootstrap/Card";
import { KilometersChart } from "./KilometersChart";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const CarCard = ({
  carAddress,
  carMaker,
  carModel,
  carYear,
  carRegistrationDate,
  carImage0,
  carImage1,
  carImage2,
  carImage3,
  carAccidents,
  carReparations,
  kilometersData,
  licensePlate,
  canChangeOwner,
  contract,
  account,
}) => {
  const [walletAddress, setWalletAddress] = useState("");

  const handleWalletAddressChange = (e) => setWalletAddress(e.target.value);

  const handleConfirmChangeOwner = async () => {
    try {
      const tx = await contract.setNewOwnerOfCar(licensePlate, walletAddress);
      await tx.wait();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (
    !carAddress || carAddress === "0x0000000000000000000000000000000000000000"
  ) {
    return <h1>Este vehiculo no existe o no esta registrado</h1>;
  }

  return (
    <>
      <Card
        className="text-center"
        style={{
          border: "1px solid #ccc",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <Card.Title>
            <h4>
              Maker: {carMaker}, Model: {carModel}
            </h4>
          </Card.Title>
          <Card.Text>
            <h4>This vehicle was manufactured: {carYear}</h4>
          </Card.Text>
          <Card.Text>
            <h4>
              This vehicle was registered: {carRegistrationDate}
            </h4>
          </Card.Text>

          <div>
            <img
              key={0}
              src={carImage0}
              alt={`Car Image 0`}
              style={{ width: "100%", maxWidth: "200px", margin: "10px" }}
            />
            <img
              key={1}
              src={carImage1}
              alt={`Car Image 1`}
              style={{ width: "100%", maxWidth: "200px", margin: "10px" }}
            />
            <img
              key={2}
              src={carImage2}
              alt={`Car Image 2`}
              style={{ width: "100%", maxWidth: "200px", margin: "10px" }}
            />
            <img
              key={3}
              src={carImage3}
              alt={`Car Image 3`}
              style={{ width: "100%", maxWidth: "200px", margin: "10px" }}
            />
            <KilometersChart data={kilometersData} />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <h3>Accidents History</h3>
            {carAccidents.length === 0 && <p>No accidents</p>}
            {carAccidents.map((accident, index) => (
              <EventCard key={index} event={accident} />
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-start">
            <h3>Reparations History</h3>
            {carReparations.length === 0 && <p>No reparations</p>}
            {carReparations.map((repair, index) => (
              <EventCard key={index} event={repair} />
            ))}
          </div>

          {canChangeOwner && (
            <div>
              <FormControl
                placeholder="Enter wallet address"
                aria-label="Wallet address"
                aria-describedby="basic-addon1"
                value={walletAddress}
                onChange={handleWalletAddressChange}
              />
              <Button variant="primary" onClick={handleConfirmChangeOwner}>
                Change Owner
              </Button>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Smart Contract Address: {carAddress}
        </Card.Footer>
      </Card>
    </>
  );
};

export default CarCard;
