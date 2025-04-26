import React, { useState } from 'react';

export default function TodoForm({ onAdd, isSubmitting }) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || isSubmitting) return;
        await onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your task"
                className="flex-1 h-[50px] bg-transparent outline-none"
                autoFocus
                required
                type="text"
                disabled={isSubmitting}
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-2 ${
                    isSubmitting ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-500'
                } text-white font-bold px-5 py-1.5 rounded-full text-sm transition-colors`}
            >
                {isSubmitting ? 'Adding...' : 'ADD'}
            </button>
        </form>
    );
}
