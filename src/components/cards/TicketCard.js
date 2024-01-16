import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="border border-blue-500 p-4 m-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{ticket.topic}</h3>
      <p className="mb-2">Description: {ticket.description}</p>
      <p className="mb-2">Severity: {ticket.severity}</p>
      <p className="mb-2">Type: {ticket.type}</p>
      <p className="mb-2">Status: {ticket.status}</p>
      <p className="mb-2">Assigned To: {ticket.assignedTo}</p>
      {ticket.resolvedOn && (
        <p className="mb-2">Resolved On: {ticket.resolvedOn}</p>
      )}
    </div>
  );
};

export default TicketCard;
