import React from "react";

export default function TaskList() {
  return (
    <div className="overflow-x-auto p-4 w-full">
      <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
        {/* Table Head */}
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">User ID</th>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Due Date</th>
            <th className="px-6 py-3 text-left">Priority</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Updated At</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {/* Row 1 */}
          <tr className="hover:bg-gray-100 border-b">
            <td className="px-6 py-3">1</td>
            <td className="px-6 py-3">Cy Ganderton</td>
            <td className="px-6 py-3">Quality Control Specialist</td>
            <td className="px-6 py-3">Task Title 1</td>
            <td className="px-6 py-3">Task Description 1</td>
            <td className="px-6 py-3">2023-12-31</td>
            <td className="px-6 py-3">High</td>
            <td className="px-6 py-3">Work</td>
            <td className="px-6 py-3">2023-12-01</td>
            <td className="px-6 py-3">2023-12-02</td>
          </tr>

          {/* Additional Row */}
          <tr className="hover:bg-gray-100 border-b">
            <td className="px-6 py-3">2</td>
            <td className="px-6 py-3">John Doe</td>
            <td className="px-6 py-3">Software Engineer</td>
            <td className="px-6 py-3">Task Title 2</td>
            <td className="px-6 py-3">Task Description 2</td>
            <td className="px-6 py-3">2024-01-15</td>
            <td className="px-6 py-3">Medium</td>
            <td className="px-6 py-3">Personal</td>
            <td className="px-6 py-3">2023-12-05</td>
            <td className="px-6 py-3">2023-12-10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
