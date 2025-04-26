import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, handleToggleTodo, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p className="text-6xl mb-4">🌱</p>
                <p className="text-lg">No tasks yet!</p>
                <p className="text-sm">Let's add some tasks to grow your productivity</p>
            </div>
        );
    }

    return (
        <ul className="space-y-4">
            {todos.map((todo) => (

                    <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={onDelete} />

            ))}
        </ul>
    );
}
