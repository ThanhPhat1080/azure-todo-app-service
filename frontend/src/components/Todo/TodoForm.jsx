import React, { useRef, useState } from 'react';

export default function TodoForm({ handleAddTodo, isSubmitting }) {
    const formRef = useRef();

    const onAction = (formData) => {
        const newTodo = formData.get('todo');

        if (!newTodo) return;

        handleAddTodo(newTodo);
        formRef.current.reset();
    };

    return (
        <form action={onAction} ref={formRef} className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <input
                name="todo"
                placeholder="Add your task"
                className="flex-1 h-[50px] bg-transparent outline-none"
                autoFocus
                required
                type="text"
            />
            <button
                type="submit"
                className={`ml-2 ${
                    isSubmitting ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-500'
                } text-white font-bold px-5 py-1.5 rounded-full text-sm transition-colors`}
            >
                {isSubmitting ? 'Adding...' : 'ADD'}
            </button>
        </form>
    );
}
