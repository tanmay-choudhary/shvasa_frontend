import React from "react";

const AgentTicket = ({ ticket, updateTicket }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="bg-white border border-blue-400 shadow-md p-4 m-4 rounded-lg space-y-4 relative">
      {ticket.status != "Resolved" && (
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full"
          onClick={() => {
            updateTicket(ticket._id);
          }}
        >
          Update Status To Resolved
        </button>
      )}

      <h3 className="text-xl font-bold mb-2">{ticket.topic}</h3>

      <p className="font-medium">
        Severity: <span className="font-normal">{ticket.severity}</span>
      </p>
      <p className="font-medium">
        Type: <span className="font-normal">{ticket.type}</span>
      </p>
      <p className="font-medium">
        Status: <span className="font-normal">{ticket.status}</span>
      </p>

      <p className="font-medium">
        Created On:{" "}
        <span className="font-normal">{formatDate(ticket.dateCreated)}</span>
      </p>
    </div>
  );
};

export default AgentTicket;
