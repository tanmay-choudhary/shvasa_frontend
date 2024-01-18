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
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={agentForm.name}
            onChange={handleAgentChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
            required
          />
        </label>

        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={agentForm.email}
            onChange={handleAgentChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
            required
          />
        </label>

        <label className="block">
          Phone:
          <input
            type="text"
            name="phone"
            value={agentForm.phone}
            onChange={handleAgentChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
            required
          />
        </label>

        <label className="block">
          Description:
          <input
            type="text"
            name="description"
            value={agentForm.description}
            onChange={handleAgentChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
            required
          />
        </label>

        <label className="block">
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
            className="form-checkbox mt-1"
          />
        </label>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
