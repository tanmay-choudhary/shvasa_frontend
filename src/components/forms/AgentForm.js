import React, { useState } from "react";

const AgentForm = ({ onSubmit, onClose }) => {
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    active: true,
  });

  const handleAgentChange = (e) => {
    setAgentForm({
      ...agentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(agentForm);
  };

  return (
    <div>
      <h2>Create Agent</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={agentForm.name}
            onChange={handleAgentChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={agentForm.email}
            onChange={handleAgentChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={agentForm.phone}
            onChange={handleAgentChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={agentForm.description}
            onChange={handleAgentChange}
            required
          />
        </label>
        <br />
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={agentForm.active}
            onChange={() =>
              setAgentForm({
                ...agentForm,
                active: !agentForm.active,
              })
            }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AgentForm;
