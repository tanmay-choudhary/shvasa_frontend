import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <h3>{ticket.topic}</h3>
      <p>Description: {ticket.description}</p>
      <p>Severity: {ticket.severity}</p>
      <p>Type: {ticket.type}</p>
      <p>Status: {ticket.status}</p>
      <p>Assigned To: {ticket.assignedTo}</p>
      {ticket.resolvedOn && <p>Resolved On: {ticket.resolvedOn}</p>}
    </div>
  );
};

export default TicketCard;
