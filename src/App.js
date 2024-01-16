import React, { useState } from "react";
import ModalWrapper from "./components/ModalWrapper";
import TicketForm from "./components/forms/TicketForm";
import AgentForm from "./components/forms/AgentForm";
import TicketCard from "./components/cards/TicketCard";
import "./App.css";

function App() {
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [tickets, setTickets] = useState([
    {
      topic: "Login Issue",
      description: "Unable to log in to the system.",
      severity: "High",
      type: "Bug",
      assignedTo: "Agent001",
      status: "New",
      resolvedOn: null,
    },
    {
      topic: "Feature Request",
      description: "Request for a new feature.",
      severity: "Medium",
      type: "Enhancement",
      assignedTo: "Agent002",
      status: "Assigned",
      resolvedOn: null,
    },
  ]);

  const openTicketModal = () => setTicketModalOpen(true);
  const closeTicketModal = () => setTicketModalOpen(false);

  const openAgentModal = () => setAgentModalOpen(true);
  const closeAgentModal = () => setAgentModalOpen(false);

  const submitTicketForm = (ticketData) => {
    console.log("Submitting Ticket Form:", ticketData);
    setTickets([...tickets, ticketData]);
    closeTicketModal();
  };

  const submitAgentForm = (agentData) => {
    console.log("Submitting Agent Form:", agentData);
    closeAgentModal();
  };

  return (
    <div>
      <button onClick={openTicketModal}>Create Ticket</button>
      <button onClick={openAgentModal}>Create Agent</button>

      <ModalWrapper
        isOpen={isTicketModalOpen}
        onClose={closeTicketModal}
        label="Create Ticket Modal"
      >
        <TicketForm onSubmit={submitTicketForm} onClose={closeTicketModal} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isAgentModalOpen}
        onClose={closeAgentModal}
        label="Create Agent Modal"
      >
        <AgentForm onSubmit={submitAgentForm} onClose={closeAgentModal} />
      </ModalWrapper>

      <h2>Supports Tickets ...</h2>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
}

export default App;
