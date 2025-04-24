import { useState, useEffect } from "react";
import api from "./api";
import ComfirmationDialog from "./components/ConfirmationModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data || []);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;
    const res = await api.post("/todos", { text });
    setTodos([res.data, ...todos]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (id) => {
    const res = await api.put(`/todos/${id}/toggle`);
    setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
  };
console.log(isModalOpen);

  return (
    <>
      <ComfirmationDialog
        isVisible={isModalOpen}
        todo={selectedTodo}
        onConfirm={() => {
          if (selectedTodo) {
            deleteTodo(selectedTodo.id);
            setIsModalOpen(false);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 relative">
          {/* Fixed Header and Input Form */}
          <div className="sticky top-0 bg-white z-10 pb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">
              To-Do List <span className="text-xl">📋</span>
            </h1>

            <form
              onSubmit={addTodo}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your task"
                className="flex-1 h-[50px] bg-transparent outline-none"
                autoFocus
                required
                type="text"
              />
              <button
                type="submit"
                className="ml-2 bg-red-400 hover:bg-red-500 text-white font-bold px-5 py-1.5 rounded-full text-sm"
              >
                ADD
              </button>
            </form>
          </div>

          {/* Todo List with Empty State */}
          <div className="h-[400px] overflow-y-auto px-4">
            {todos.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p className="text-6xl mb-4">🌱</p>
                <p className="text-lg">No tasks yet!</p>
                <p className="text-sm">Let's add some tasks to grow your productivity</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between text-sm py-2"
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => toggleTodo(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleTodo(todo.id);
                        }
                      }}
                      aria-hidden="true"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          todo.completed
                            ? "bg-red-500 border-red-500"
                            : "border-gray-400"
                        }`}
                      >
                        {todo.completed && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span
                        className={`${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        console.log('defeff');

                        setSelectedTodo(todo);
                        setIsModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
