import React from "react";

const TicketCard = ({ ticket }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="bg-white border border-blue-400 shadow-md p-4 m-4 rounded-lg space-y-4">
      {/*  <h1 className="text-2xl font-bold ">
        <span className="text-blue-500 bg-blue-100 rounded-full px-5 py-2">
          {ticket?.id}
        </span>
  </h1> */}

      <h3 className="text-xl font-bold mb-2">{ticket.topic}</h3>
      <p className=" font-medium">
        Description: <span className="font-normal">{ticket.description}</span>
      </p>
      <p className=" font-medium">
        Severity: <span className="font-normal">{ticket.severity}</span>
      </p>
      <p className=" font-medium">
        Type: <span className="font-normal">{ticket.type}</span>
      </p>
      <p className=" font-medium">
        Status: <span className="font-normal">{ticket.status}</span>
      </p>
      <p className=" font-medium">
        Assigned To: <span className="font-normal">{ticket.assignedTo}</span>
      </p>
      <p className="font-medium">
        Created On:{" "}
        <span className="font-normal">{formatDate(ticket.dateCreated)}</span>
      </p>
      {ticket.resolvedOn && (
        <p className=" font-medium">
          Resolved On: <span className="font-normal">{ticket.resolvedOn}</span>
        </p>
      )}
    </div>
  );
};

export default TicketCard;
