
import Card from "react-bootstrap/Card";
const EventCard = ({ event }) => {
  return (
    <Card
      style={{
        width: "18rem",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "10px",
        borderRadius: "5px",
        justifyContent: "space-between",
        

      }}
    >
      <Card.Body style={{margin:"5px" ,justifyContent:"left"}}>
        <Card.Text><b>Type:</b> {event.type}</Card.Text>
        <Card.Text><b>Year:</b> {event.year}</Card.Text>
        <Card.Text><b>Description:</b> {event.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
