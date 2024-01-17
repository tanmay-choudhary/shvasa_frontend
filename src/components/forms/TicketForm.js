import React, { useState } from "react";

const TicketForm = ({ onSubmit, onClose }) => {
  const [ticketForm, setTicketForm] = useState({
    topic: "",
    description: "",
    severity: "",
    type: "",
  });

  const handleTicketChange = (e) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ticketForm);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold pb-2 border-b-2 border-gray-400 inline-block">
          Create Ticket
        </h2>
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>{" "}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={ticketForm.topic}
            onChange={handleTicketChange}
            placeholder="Enter topic here"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label>Description:</label>
          <textarea
            multiline
            type="text"
            name="description"
            value={ticketForm.description}
            onChange={handleTicketChange}
            placeholder="Enter description here"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label>Severity:</label>
          <select
            name="severity"
            value={ticketForm.severity}
            onChange={handleTicketChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Severity
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label>Type:</label>
          <select
            name="type"
            value={ticketForm.type}
            onChange={handleTicketChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Enhancement">Enhancement</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="py-2 px-6 bg-blue-500 text-white rounded-2xl text-lg font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
