import EventCard from "./EventCard";
import Card from "react-bootstrap/Card";
import { KilometersChart } from "./KilometersChart";

const CarCard = (
  {
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
  },
) => {
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
        }}
      >
        <Card.Header>Vehiculo encontrado:</Card.Header>
        <Card.Body>
          <Card.Title>
            Fabricante: {carMaker}, Modelo: {carModel}
          </Card.Title>
          <Card.Text>Este vehiculo ha sido fabricado en: {carYear}</Card.Text>
          <Card.Text>
            Este vehiculo ha sido matriculado en: {carRegistrationDate}
          </Card.Text>
          <div className="d-flex flex-wrap justify-content-start">
            <img
              key={0}
              src={carImage0}
              alt={`Car Image 0`}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <img
              key={1}
              src={carImage1}
              alt={`Car Image 1`}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <img
              key={2}
              src={carImage2}
              alt={`Car Image 2`}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <img
              key={3}
              src={carImage3}
              alt={`Car Image 3`}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <KilometersChart data={kilometersData} />
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          Direccion del contrato: {carAddress}
        </Card.Footer>
      </Card>

      <div className="d-flex flex-wrap justify-content-center">
        <h4>Historial de accidentes</h4>
        {carAccidents.map((accident, index) => (
          <EventCard key={index} event={accident} />
        ))}
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        <h4>Historial de Reparaciones</h4>
        {carReparations.map((repair, index) => (
          <EventCard key={index} event={repair} />
        ))}
      </div>
    </>
  );
};

export default CarCard;
