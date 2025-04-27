import React, { use, useState, useOptimistic, useActionState, Suspense, useEffect, useTransition } from 'react';
import { addTodoAction, toggleTodoAction, deleteTodoAction, fetchTodos } from '../../actions/todoActions';
import ConfirmationDialog from '../ConfirmationModal';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useToast } from '../../contexts/ToastContext';

function TodoContainerContent({ todoPromise }) {
    const [todos, setTodos] = useState(use(todoPromise));
    const { showToast } = useToast();

    const handleToggleTodo = async (id) => {
        try {
            await toggleTodoAction(id);

            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
            );
        } catch (error) {
            showToast('Failed to update todo. Please try again!');
            console.error('Failed to update todo:', error);
        }
    };

    const handleAddTodo = async (text) => {
        try {
            const newTodo = await addTodoAction(text);
            setTodos((prevTodos) => [newTodo, ...prevTodos]);
        } catch (error) {
            showToast('Failed to add todo. Please try again!');
            console.error('Failed to add todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodoAction(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            showToast('Failed to delete todo. Please try again!');
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <Todo
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
            handleAddTodo={handleAddTodo}
            handleToggleTodo={handleToggleTodo}
        />
    );
}

function Todo({ todos, handleToggleTodo, handleAddTodo, handleDeleteTodo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isPending, startTransition] = useTransition();

    const [optimisticTodos, dispatchOptimisticTodo] = useOptimistic(todos, (state, action) => {
        switch (action.type) {
            case 'add':
                return [action.todo, ...state];
            case 'delete':
                return state.filter((todo) => todo.id !== action.id);
            case 'toggle':
                return state.map((todo) =>
                    todo.id === action.id ? { ...todo, completed: !todo.completed, isPending } : todo
                );
            default:
                return state;
        }
    });
    const addTodo = async (todo) => {
        startTransition(async () => {
            const optimisticTodo = {
                id: Date.now(), // Temporary ID
                text: todo,
                completed: false,
                createdAt: new Date().toISOString(),
                isPending: true,
            };

            dispatchOptimisticTodo({ type: 'add', todo: optimisticTodo });

            await handleAddTodo(todo);
        });
    };

    const onToggleTodo = async (id) => {
        startTransition(async () => {
            dispatchOptimisticTodo({ type: 'toggle', id });

            await handleToggleTodo(id);
        });
    };

    const handleDelete = async (id) => {
        setIsModalOpen(false);
        startTransition(async () => {
            dispatchOptimisticTodo({ type: 'delete', id });

            await handleDeleteTodo(id);
        });
    };

    const onDelete = (todo) => {
        setIsModalOpen(true);
        setSelectedTodo(todo);
    };

    return (
        <>
            <ConfirmationDialog
                isVisible={isModalOpen}
                todo={selectedTodo}
                onConfirm={() => selectedTodo && handleDelete(selectedTodo.id)}
                onCancel={() => setIsModalOpen(false)}
            />
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 relative">
                    <div className="sticky top-0 bg-white z-10 pb-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">
                            To-Do List <span className="text-xl">📋</span>
                        </h1>
                        <TodoForm handleAddTodo={addTodo} />
                    </div>

                    <div className="h-[400px] overflow-y-auto px-4">
                        <TodoList todos={optimisticTodos} handleToggleTodo={onToggleTodo} onDelete={onDelete} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default function TodoContainer() {
    const todoPromise = fetchTodos();

    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                    <div className="text-white">Loading todos...</div>
                </div>
            }
        >
            <TodoContainerContent todoPromise={todoPromise} />
        </Suspense>
    );
}
