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
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input
            type="text"
            name="topic"
            value={ticketForm.topic}
            onChange={handleTicketChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={ticketForm.description}
            onChange={handleTicketChange}
            required
          />
        </label>
        <br />
        <label>
          Severity:
          <input
            type="text"
            name="severity"
            value={ticketForm.severity}
            onChange={handleTicketChange}
            required
          />
        </label>
        <br />
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={ticketForm.type}
            onChange={handleTicketChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TicketForm;
