import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

function Todo() {
  const { theme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTodo, setNewTodo] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleUpdate = () => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((t) =>
        t.id === editId ? { ...t, text: editText } : t
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div
      className={`p-6 mt-12 max-w-2xl mx-auto rounded-lg shadow-xl transition-all
    ${theme === "dark" ? "bg-[#1a0000] text-white" : "bg-white text-black"}
    w-full sm:p-8 md:p-10 lg:p-12
  `}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List 📝</h1>
      <div className="mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Type a task..."
          className={`w-full p-2 rounded-md outline-none border ${theme === "dark"
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-gray-100 text-black border-gray-300"
            }`}
        />
        <button
          onClick={handleAdd}
          className={`w-full mt-2 py-2 rounded-md font-semibold transition-all ${theme === "dark"
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Add Todo
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex flex-col gap-2 p-3 rounded-md transition-all ${theme === "dark"
              ? "bg-[#2a0000] text-white"
              : "bg-gray-100 text-black"
              }`}
          >
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={`w-full p-2 rounded-md border ${theme === "dark"
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                    }`}
                />
                <button
                  onClick={handleUpdate}
                  className={`py-2 rounded-md font-semibold transition-all ${theme === "dark"
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-yellow-400 text-white hover:bg-yellow-500"
                    }`}
                >
                  Update
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span
                  className={`flex-1 ${todo.completed
                    ? theme === "dark"
                      ? "line-through text-gray-400"
                      : "line-through text-gray-600"
                    : ""
                    }`}
                >
                  {todo.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(todo.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${theme === "dark"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                  >
                    {todo.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${theme === "dark"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-yellow-400 text-white hover:bg-yellow-500"
                      }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${theme === "dark"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {todos.some((t) => t.completed) && (
        <button
          onClick={() => setTodos(todos.filter((t) => !t.completed))}
          className={`w-full mt-4 py-2 rounded-md font-semibold transition-all ${theme === "dark"
            ? "bg-purple-700 text-white hover:bg-purple-800"
            : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
        >
          Clear Completed
        </button>
      )}

    </div>
  );
}

export default Todo;
