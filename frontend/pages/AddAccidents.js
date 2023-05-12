import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card} from "react-bootstrap";
import { Spinner } from "react-bootstrap";


export const AddAccident = ({ contractInstance, account }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [year, setYear] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tx = await contractInstance.addAccidenteToCar(licensePlate,type, year, description);

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
          <Card body style={{ width: '50rem' }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Add Accident to Car</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="licensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type of Accident</Form.Label>
              <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
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
                />            &nbsp; Adding a new accident
                    </>
                ) : (
                    "Add Accident"
                )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default AddAccident;

