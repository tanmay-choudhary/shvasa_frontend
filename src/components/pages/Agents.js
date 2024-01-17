import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import TicketForm from "../forms/TicketForm";
import AgentForm from "../forms/AgentForm";
import TicketCard from "../cards/TicketCard";
import FilterModal from "../filters/FilterModal";
import "tailwindcss/tailwind.css";

const Agents = () => {
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: "1",
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
      id: "2",
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
    <div className="bg-gray-200 container mx-auto p-4">
      <div className="lg:px-4 flex items-center justify-center lg:justify-start">
        {" "}
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
      </div>

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

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onSubmit={applyFilters}
      />
      <div className="flex items-center justify-between px-5 my-8">
        {" "}
        <h2 className="text-3xl text-blue-900 font-bold  flex items-center  space-x-2">
          Support Tickets
        </h2>{" "}
        <div
          className=" cursor-pointer underline text-blue-800  text-xl"
          onClick={openFilterModal}
        >
          Filters
        </div>
      </div>

      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
};

export default Agents;
