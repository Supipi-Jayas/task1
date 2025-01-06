import TaskAdd from "../components/TaskAdd";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <p className="text-gray-600">Organize and track your tasks effectively</p>
          <div className="mt-6">
            <TaskAdd />
          </div>
        </div>
        <div className="bg-gray-100 p-5 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Task List</h2>
          <TaskList />
        </div>
      </div>
    </main>
  );
}
