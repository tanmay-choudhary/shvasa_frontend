import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import TicketForm from "../forms/TicketForm";
import TicketCard from "../cards/TicketCard";
import FilterModal from "../filters/FilterModal";
import MakeApiCall from "../utils/MakeApiCall";
import "tailwindcss/tailwind.css";

const Tickets = () => {
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [boolean, setBoolean] = useState(true);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalData, setSuccessModalData] = useState({});

  const openTicketModal = () => setTicketModalOpen(true);
  const closeTicketModal = () => setTicketModalOpen(false);

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => setFilterModalOpen(false);

  const submitTicketForm = async (ticketData) => {
    let date = new Date();
    let obj = {
      topic: ticketData.topic,
      description: ticketData.description,
      severity: ticketData.severity,
      type: ticketData.type,
      dateCreated: date,
    };
    console.log("Submitting Ticket Form:", obj);

    await addTickets(obj);
    //setTickets([...tickets, ticketData]);
    closeTicketModal();
  };

  const assignTicket = async (id) => {
    try {
      const response = await MakeApiCall("PATCH", "/api/assign-tickets", {
        ticketId: id,
      });

      //console.log("Received data:", response.data);
      //setTickets(response.data);
      setSuccessModalData(response.data);
      setSuccessModalOpen(true);
      setBoolean(!boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addTickets = async (obj) => {
    try {
      const response = await MakeApiCall("POST", "/api/support-tickets", obj);

      //console.log("Received data:", response.data);
      //setTickets(response.data);
      setBoolean(!boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = (filterData) => {
    //console.log("Applying Filters:", filterData);
    const fetchTickets = async (filterData) => {
      try {
        const response = await MakeApiCall(
          "POST",
          "/api/get-tickets",
          filterData
        );

        //console.log("Received data:", response.data);
        setTickets(response.data);

        closeFilterModal();
      } catch (error) {
        console.error("Error fetching data:", error);
        closeFilterModal();
      }
    };

    fetchTickets(filterData);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await MakeApiCall("GET", "/api/get-tickets");

        //console.log("Received data:", response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTickets();
  }, [boolean]);
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
      </div>

      <ModalWrapper
        isOpen={isTicketModalOpen}
        onClose={closeTicketModal}
        label="Create Ticket Modal"
      >
        <TicketForm onSubmit={submitTicketForm} onClose={closeTicketModal} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        label="Success Modal"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            Ticket Successfully assigned to {successModalData.name}
          </h2>
          <p>Email: {successModalData.email}</p>
          <p>Phone: {successModalData.phone}</p>
          <p>Description: {successModalData.description}</p>
          {/* Add more details as needed */}
        </div>
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
          <TicketCard key={index} ticket={ticket} assignTicket={assignTicket} />
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
};

export default Tickets;
