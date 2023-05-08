
import Card from "react-bootstrap/Card";
const EventCard = ({ event }) => {
  return (
    <Card
      style={{
        width: "18rem",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

      }}
    >
      <Card.Body className = "m-10">
        <Card.Title>Tipo: {event.type}</Card.Title>
        <Card.Text>Ano: {event.year}</Card.Text>
        <Card.Text>Descripcion: {event.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
