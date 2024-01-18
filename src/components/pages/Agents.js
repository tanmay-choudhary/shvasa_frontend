import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import AgentForm from "../forms/AgentForm";
import AgentCard from "../cards/AgentCard";
import AgentTicket from "../cards/AgentTicket";
import MakeApiCall from "../utils/MakeApiCall";
import "tailwindcss/tailwind.css";

const Agents = () => {
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [isAgentTicketModalOpen, setAgentTicketModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [boolean, setBoolean] = useState(true);
  const [agents, setAgents] = useState([]);
  const [agentTickets, setAgentTickets] = useState([]);

  const openAgentModal = () => setAgentModalOpen(true);
  const closeAgentModal = () => setAgentModalOpen(false);
  const openAgentTicketModal = () => setAgentTicketModalOpen(true);
  const closeAgentTicketModal = () => setAgentTicketModalOpen(false);

  const submitAgentForm = async (agentData) => {
    let date = new Date();
    let obj = {
      name: agentData.name,
      email: agentData.email,
      phone: agentData.phone,
      description: agentData.description,
      active: agentData.active,
      dateCreated: date,
    };

    await addAgents(obj);
    closeAgentModal();
  };

  const addAgents = async (obj) => {
    try {
      setLoading(true);
      const response = await MakeApiCall("POST", "/api/support-agents", obj);
      setBoolean(!boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewAgent = async (id) => {
    const fetchTickets = async (filterData) => {
      try {
        setLoading(true);
        const response = await MakeApiCall(
          "POST",
          "/api/get-tickets",
          filterData
        );
        setAgentTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets({ assignedTo: id });
    openAgentTicketModal();
  };

  const updateTicket = async (id) => {
    try {
      setLoading(true);
      const response = await MakeApiCall("PATCH", "/api/update-tickets", {
        ticketId: id,
      });
      setBoolean(!boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await MakeApiCall("GET", "/api/get-agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [boolean]);

  return (
    <div className="bg-gray-200 container mx-auto p-4">
      <div className="lg:px-4 flex items-center justify-center lg:justify-start">
        <button
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={openAgentModal}
        >
          Create Agent
        </button>
      </div>

      <ModalWrapper
        isOpen={isAgentModalOpen}
        onClose={closeAgentModal}
        label="Create Agent Modal"
      >
        <AgentForm onSubmit={submitAgentForm} onClose={closeAgentModal} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isAgentTicketModalOpen}
        onClose={closeAgentTicketModal}
        label="Create Agent Modal"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : agentTickets.length > 0 ? (
          agentTickets.map((ticket, index) => (
            <AgentTicket
              key={index}
              ticket={ticket}
              updateTicket={updateTicket}
            />
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </ModalWrapper>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : agents.length > 0 ? (
        agents.map((agent, index) => (
          <AgentCard key={index} agent={agent} viewAgent={viewAgent} />
        ))
      ) : (
        <p>No Agents available.</p>
      )}
    </div>
  );
};

export default Agents;
