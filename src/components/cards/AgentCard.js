import React from "react";

const AgentCard = ({ agent, viewAgent }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white border border-blue-400 shadow-md p-4 m-4 rounded-lg space-y-4 relative">
      <button
        className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full"
        onClick={() => {
          viewAgent(agent._id);
        }}
      >
        View Tickets
      </button>

      <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
      <p className="font-medium">
        Email: <span className="font-normal">{agent.email}</span>
      </p>
      <p className="font-medium">
        Phone: <span className="font-normal">{agent.phone}</span>
      </p>
      <p className="font-medium">
        Active: <span className="font-normal">{agent.active.toString()}</span>
      </p>
      <p className="font-medium">
        Description: <span className="font-normal">{agent.description}</span>
      </p>
      <p className="font-medium">
        Created On:{" "}
        <span className="font-normal">{formatDate(agent.dateCreated)}</span>
      </p>
    </div>
  );
};

export default AgentCard;
