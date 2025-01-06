"use client";

import { CiCirclePlus } from "react-icons/ci";
import Models from "./Models";
import { useState } from "react";

const TaskAdd = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="text-center">
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center py-3 px-5 rounded shadow-lg transition duration-300"
      >
        Add New Task
        <CiCirclePlus className="ml-2" size={20} />
      </button>
      {modalOpen && (
        <Models modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form className="space-y-4 w-full max-w-4xl mx-auto p-4">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Add New Task</h3>

            {/* Task Title */}
            <div>
              <label htmlFor="taskTitle" className="block text-gray-700 font-medium mb-2">
                Task Title
              </label>
              <input
                id="taskTitle"
                name="taskTitle"
                type="text"
                placeholder="Enter task title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Task Description */}
            <div>
              <label htmlFor="taskDescription" className="block text-gray-700 font-medium mb-2">
                Task Description
              </label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                placeholder="Enter task description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="taskPriority" className="block text-gray-700 font-medium mb-2">
                Priority Level
              </label>
              <select
                id="taskPriority"
                name="taskPriority"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="taskDueDate" className="block text-gray-700 font-medium mb-2">
                Due Date
              </label>
              <input
                id="taskDueDate"
                name="taskDueDate"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="taskCategory" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                id="taskCategory"
                name="taskCategory"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Add Task
              </button>
            </div>
          </form>
        </Models>
      )}
    </div>
  );
};

export default TaskAdd;
