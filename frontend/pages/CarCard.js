
import EventCard from './EventCard';
import Card from "react-bootstrap/Card";



const CarCard = ({ carAddress, carMaker, carModel, carYear, carRegistrationDate, carImages, carAccidents, carReparations }) => {
  if (!carAddress || carAddress === "0x0000000000000000000000000000000000000000") {
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
          <Card.Text>Este vehiculo ha sido matriculado en: {carRegistrationDate}</Card.Text>           
          {carImages.map((imageUrl, index) => (
            <img
              key={index}
              src={carImages}
              alt={`Car Image ${index + 1}`}
              style={{ width: '100%', maxWidth: '200px' }}  
            />
          ))}
        </Card.Body>
        <Card.Footer className="text-muted">
          Direccion del contrato: {carAddress}
        </Card.Footer>
      </Card>

      <div className="m-10 d-flex flex-wrap justify-content-start">
        <h4> Historial de accidentes </h4>
        {carAccidents.map((accident, index) => (
          <EventCard key={index} event={accident} />
        ))}
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        <h4> Historial de Reparaciones </h4>
        {carReparations.map((repair, index) => (
          <EventCard key={index} event={repair} />
        ))}
      </div>
    </>
  );
};

export default CarCard;
