import React, { useState } from "react";
import ModalWrapper from "./components/ModalWrapper";
import TicketForm from "./components/forms/TicketForm";
import AgentForm from "./components/forms/AgentForm";
import TicketCard from "./components/cards/TicketCard";
import FilterModal from "./components/filters/FilterModal";
import "tailwindcss/tailwind.css";
import "./index.css";

function App() {
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tickets, setTickets] = useState([
    {
      topic: "Login Issue",
      description: "Unable to log in to the system.",
      severity: "High",
      type: "Bug",
      assignedTo: "Agent001",
      status: "New",
      resolvedOn: null,
      dateCreated: new Date("2022-01-01"),
    },
    {
      topic: "Feature Request",
      description: "Request for a new feature.",
      severity: "Medium",
      type: "Enhancement",
      assignedTo: "Agent002",
      status: "Assigned",
      resolvedOn: null,
      dateCreated: new Date("2022-01-05"),
    },
  ]);

  const openTicketModal = () => setTicketModalOpen(true);
  const closeTicketModal = () => setTicketModalOpen(false);

  const openAgentModal = () => setAgentModalOpen(true);
  const closeAgentModal = () => setAgentModalOpen(false);

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => setFilterModalOpen(false);

  const submitTicketForm = (ticketData) => {
    console.log("Submitting Ticket Form:", ticketData);
    setTickets([...tickets, ticketData]);
    closeTicketModal();
  };

  const submitAgentForm = (agentData) => {
    console.log("Submitting Agent Form:", agentData);
    closeAgentModal();
  };

  const applyFilters = (filterData) => {
    console.log("Applying Filters:", filterData);
    const filteredTickets = tickets.filter((ticket) => {
      return (
        (filterData.status
          ? ticket.status.includes(filterData.status)
          : true) &&
        (filterData.assignedTo
          ? ticket.assignedTo.includes(filterData.assignedTo)
          : true) &&
        (filterData.severity
          ? ticket.severity.includes(filterData.severity)
          : true) &&
        (filterData.type ? ticket.type.includes(filterData.type) : true)
      );
    });

    const sortedTickets = filteredTickets.sort((a, b) => {
      if (filterData.sortField === "resolvedOn") {
        return (
          new Date(b.resolvedOn || 0).getTime() -
          new Date(a.resolvedOn || 0).getTime()
        );
      } else if (filterData.sortField === "dateCreated") {
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      }
      return 0;
    });

    setTickets(sortedTickets);
    closeFilterModal();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openTicketModal}
      >
        Create Ticket
      </button>
      <button
        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={openAgentModal}
      >
        Create Agent
      </button>

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

      <div
        className="cursor-pointer underline text-blue-500 mt-2"
        onClick={openFilterModal}
      >
        Filter
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onSubmit={applyFilters}
      />

      <h2 className="text-5xl text-orange-800 font-bold mt-4">
        Support Tickets
      </h2>
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
