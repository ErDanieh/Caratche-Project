import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

export const AddKilometers = ({ contractInstance, account }) => {
  const [type, setType] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [year, setYear] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tx = await contractInstance.addKilometrajeToCar(
        licensePlate,
        year,
        kilometers,
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
        border: "1px solid #ccc",
        borderRadius: "15px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "15px 0 0 0",
      }}
    >
      <Card.Body style={{ margin: "20px" }}>
        <Card.Title style={{ textAlign: "center" }}>
          <h2>Add Kilometers to car</h2>
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="licensePlate">
            <Form.Label>License Plate</Form.Label>
            <Form.Control
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year of the count</Form.Label>
            <Form.Control
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="kilometers">
            <Form.Label>Kilometers</Form.Label>
            <Form.Control
              type="number"
              value={kilometers}
              onChange={(e) => setKilometers(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: "7px" }}
          >
            {loading
              ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant="light" // add this line to set the color of the spinner to white
                  />{" "}
                  &nbsp; Adding a new kilometer
                </>
              )
              : (
                "Add Kilometers"
              )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddKilometers;
