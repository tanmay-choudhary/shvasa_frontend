import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";

const FilterModal = ({ isOpen, onClose, onSubmit }) => {
  const [filterData, setFilterData] = useState({
    status: "",
    assignedTo: "",
    severity: "",
    type: "",
    sortField: "",
  });

  const handleChange = (e) => {
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(filterData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} label="Filter Modal">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Filter Tickets</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Status:
            <input
              type="text"
              name="status"
              value={filterData.status}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            AssignedTo:
            <input
              type="text"
              name="assignedTo"
              value={filterData.assignedTo}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Severity:
            <input
              type="text"
              name="severity"
              value={filterData.severity}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Type:
            <input
              type="text"
              name="type"
              value={filterData.type}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Sort By:
            <select
              name="sortField"
              value={filterData.sortField}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="">--Select--</option>
              <option value="resolvedOn">Resolved On</option>
              <option value="dateCreated">Date Created</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
    </ModalWrapper>
  );
};

export default FilterModal;
