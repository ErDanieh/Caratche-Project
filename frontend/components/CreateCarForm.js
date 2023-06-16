import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export const CreateCarForm = ({ contractInstance }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [walletOfOwner, setWalletOfOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tx = await contractInstance.createCar(
        make,
        model,
        parseInt(year),
        licensePlate,
        parseInt(registrationDate),
        walletOfOwner,
      );

      setLoading(true);
      await tx.wait();
      setLoading(false);

      window.location.reload();

      console.log("Transaction: ", tx);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Card
      style={{
        width: "50rem",
        height: "auto",
        border: "1px solid #ccc",
        borderRadius: "15px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "0 auto",
      }}
    >
      <Card.Body style={{ margin: "20px" }}>
        <Card.Title style={{ textAlign: "center" }}>
          <h2>Create Car</h2>
        </Card.Title>
        <Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="make" style={{ margin: "10px" }}>
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="model" style={{ margin: "10px" }}>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="year" style={{ margin: "10px" }}>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="licensePlate" style={{ margin: "10px" }}>
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="registrationDate" style={{ margin: "10px" }}>
              <Form.Label>Registration Date</Form.Label>
              <Form.Control
                type="number"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="walletOfOwner" style={{ margin: "10px" }}>
              <Form.Label>Wallet of Owner</Form.Label>
              <Form.Control
                type="text"
                value={walletOfOwner}
                onChange={(e) => setWalletOfOwner(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              style={{ margin: "10px" }}
            >
              {loading
                ? (
                  <>
                    Creando nuevo vehículo
                  </>
                )
                : (
                  "Create new car"
                )}
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CreateCarForm;
