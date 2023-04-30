
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";


export const CreateCarForm = ({ contractInstance, account }) => {
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
      const tx = await contractInstance.createCar(make, model, parseInt(year), licensePlate, parseInt(registrationDate), walletOfOwner);

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
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Create Car</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" value={make} onChange={(e) => setMake(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="licensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="registrationDate">
              <Form.Label>Registration Date</Form.Label>
              <Form.Control type="number" value={registrationDate} onChange={(e) => setRegistrationDate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="walletOfOwner">
              <Form.Label>Wallet of Owner</Form.Label>
              <Form.Control type="text" value={walletOfOwner} onChange={(e) => setWalletOfOwner(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant="light"  // add this line to set the color of the spinner to white
                />            &nbsp; Creando nuevo vehículo
                    </>
                ) : (
                    "Crear coche"
                )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCarForm;

