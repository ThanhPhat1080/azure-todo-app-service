import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between text-sm py-2">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-3 cursor-pointer flex-1"
        onClick={() => onToggle(todo.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(todo.id);
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
        onClick={() => onDelete(todo)}
        className="text-gray-400 hover:text-red-500"
      >
        ✕
      </button>
      {todo.isPending && <small className="text-sm text-gray-500">Updating...</small>}

    </li>
  );
}