// This is the main dashboard page where users can view, add, edit, and delete tasks.

import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import SearchBar from "../components/SearchBar";
import dayjs from "dayjs";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [editingId, setEditingId] = useState(null);
  const [searchdate, setSearchdate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch tasks (with optional date filter)
  const fetchTasks = useCallback(async (selectedDate = "") => {
    try {
      let url = "/task";
      if (selectedDate) url += `?date=${selectedDate}`;

      const { data } = await axios.get(url);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  // Load all tasks first time
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Refetch when search date changes
  useEffect(() => {
    fetchTasks(searchdate);
  }, [searchdate, fetchTasks]);

  // Filter locally if backend not filtering
  const filteredTasks = tasks.filter((task) => {
    if (searchdate && task.date !== searchdate) return false;
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    return true;
  });

  // Group by date
  const tasksByDate = filteredTasks.reduce((acc, task) => {
    const taskDate = task.date || dayjs().format("YYYY-MM-DD");
    if (!acc[taskDate]) acc[taskDate] = [];
    acc[taskDate].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(tasksByDate).sort((a, b) =>
    dayjs(a).isAfter(dayjs(b)) ? 1 : -1,
  );

  // Add / Update task
  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      if (editingId) {
        await axios.put(`/task/${editingId}`, { title, date });
        setEditingId(null);
      } else {
        await axios.post("/task", { title, date });
      }

      setTitle("");
      fetchTasks(searchdate);
    } catch (error) {
      console.error("Failed to add/update task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/task/${id}`);
      fetchTasks(searchdate);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";

      await axios.put(`/task/${task._id}`, {
        ...task,
        status: newStatus,
      });

      fetchTasks(searchdate);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDate(task.date || dayjs().format("YYYY-MM-DD"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 transition-all duration-500">
      <div className="max-w-6xl mx-auto pt-20 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Tasks Dashboard
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Organize tasks by date
          </p>
        </div>

        {/* Search */}
        <SearchBar date={searchdate} setDate={setSearchdate} />
        <div className="flex gap-2 my-4">
          <button
            onClick={() => setStatusFilter("all")}
            className="filter-btn text-gray-300 text-lg font-medium px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className="filter-btn text-gray-300 text-lg font-medium px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className="filter-btn text-gray-300 text-lg font-medium px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            Completed
          </button>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3 my-5">
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-300 shadow-md hover:shadow-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-300 shadow-md hover:shadow-lg"
          />

          <button
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-lg font-medium text-white
            transition-all duration-300 transform hover:scale-105
            shadow-md hover:shadow-xl ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* Tasks */}
        {sortedDates.length === 0 ? (
          <div className="text-center text-gray-400 mt-16 animate-pulse">
            No tasks found
          </div>
        ) : (
          sortedDates.map((taskDate) => (
            <div key={taskDate} className="mb-8 animate-fadeIn">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-400">
                {dayjs(taskDate).format("dddd, MMMM D, YYYY")}
              </h2>

              <div className="space-y-3">
                {tasksByDate[taskDate].map((task) => (
                  <div
                    key={task._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3
                    bg-gray-800 border border-gray-700 p-4 rounded-xl
                    shadow-md hover:shadow-xl
                    transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {task.status}
                      </span>

                      <span
                        className={`${
                          task.status === "completed"
                            ? "line-through text-gray-400"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white
                        transition-all duration-300 shadow hover:shadow-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm text-white
                        transition-all duration-300 shadow hover:shadow-lg"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => toggleStatus(task)}
                        className={`px-3 py-1 rounded text-sm text-white
  transition-all duration-300 shadow hover:shadow-lg ${
    task.status === "completed"
      ? "bg-gray-600 hover:bg-gray-700"
      : "bg-green-600 hover:bg-green-700"
  }`}
                      >
                        {task.status === "completed" ? "Undo" : "Complete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
