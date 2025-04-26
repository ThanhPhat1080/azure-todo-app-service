import React, { use, useState, useOptimistic, useActionState, Suspense, useEffect, useTransition } from 'react';
import { addTodoAction, toggleTodoAction, deleteTodoAction, fetchTodos } from '../../actions/todoActions';
import ConfirmationDialog from '../ConfirmationModal';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoContainerContent({ todoPromise }) {
    const [todos, setTodos] = useState(use(todoPromise));
    const [isPending, startTransition] = useTransition();

    const handleToggleTodo = async (id) => {
        try {
            await new Promise((res) => setTimeout(res, 5000));
            console.log("updatedTodo DONE");
            
            startTransition(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo))
                );
            });
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    return <Todo todos={todos} handleToggleTodo={handleToggleTodo} />;
}

function Todo({ todos, handleToggleTodo }) {
    // const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo) => {
    //     if (Array.isArray(state)) {
    //         return [newTodo, ...state];
    //     }
    //     return state;
    // });

    // const [actionState, action] = useActionState();
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedTodo, setSelectedTodo] = useState(null);

    // const addTodo = async (text) => {
    //     const optimisticTodo = {
    //         id: Date.now(), // Temporary ID
    //         text,
    //         completed: false,
    //         createdAt: new Date().toISOString(),
    //     };

    //     addOptimisticTodo(optimisticTodo);

    //     try {
    //         await action(async () => {
    //             await addTodoAction(text);
    //         });
    //     } catch (error) {
    //         console.error('Failed to add todo:', error);
    //     }
    // };
    const [isPending, startTransition] = useTransition();
    const [optimisticTodos, optimisticallyToggleTodo] = useOptimistic(todos, (state, id) => {
        return state.map((todo) => (todo.id == id ? { ...todo, completed: !todo.completed, isPending } : todo));
    });

    const onToggleTodo = async (id) => {
        startTransition(async () => {
            optimisticallyToggleTodo(id);

            try {
                await handleToggleTodo(id);
            } catch (error) {
                console.error('Failed to toggle todo:', error);

                // Revert if failed
                optimisticallyToggleTodo(id);
            }
        });
    };

    // const [, optimisticallyDeleteTodo] = useOptimistic(optimisticTodos, (state, id) =>
    //     state.filter((todo) => todo.id !== id)
    // );

    // const handleDelete = async (todo) => {
    //     setIsModalOpen(false);
    //     optimisticallyDeleteTodo(todo.id);
    //     try {
    //         await action(async () => {
    //             await deleteTodoAction(todo.id);
    //         });
    //     } catch (error) {
    //         console.error('Failed to delete todo:', error);
    //     }
    // };

    return (
        <>
            {/* <ConfirmationDialog
                isVisible={isModalOpen}
                todo={selectedTodo}
                onConfirm={() => selectedTodo && handleDelete(selectedTodo)}
                onCancel={() => setIsModalOpen(false)}
            /> */}
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 relative">
                    <div className="sticky top-0 bg-white z-10 pb-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">
                            To-Do List <span className="text-xl">📋</span>
                        </h1>
                        {/* <TodoForm onAdd={addTodo} isSubmitting={actionState?.status === 'pending'} /> */}
                    </div>

                    <div className="h-[400px] overflow-y-auto px-4">
                        <TodoList
                            todos={optimisticTodos}
                            handleToggleTodo={onToggleTodo}
                            // onDelete={(todo) => {
                            //     setSelectedTodo(todo);
                            //     setIsModalOpen(true);
                            // }}
                        />
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




// import React,{ useOptimistic, useState, useRef } from "react";
// // import { deliverMessage } from "./actions.js";

// export async function deliverMessage(message) {
//     await new Promise((res) => setTimeout(res, 1000));
//     return message;
//   }
  

// function Thread({ messages, sendMessage }) {
//   const formRef = useRef();
//   async function formAction(formData) {
//     addOptimisticMessage(formData.get("message"));
//     formRef.current.reset();
//     await sendMessage(formData);
//   }
//   const [optimisticMessages, addOptimisticMessage] = useOptimistic(
//     messages,
//     (state, newMessage) => [
//       ...state,
//       {
//         text: newMessage,
//         sending: true
//       }
//     ]
//   );

//   return (
//     <>
//       {optimisticMessages.map((message, index) => (
//         <div key={index}>
//           {message.text}
//           {!!message.sending && <small> (Sending...)</small>}
//         </div>
//       ))}
//       <form action={formAction} ref={formRef}>
//         <input type="text" name="message" placeholder="Hello!" />
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );
// }

// export default function TodoContainer() {
//   const [messages, setMessages] = useState([
//     { text: "Hello there!", sending: false, key: 1 }
//   ]);
//   async function sendMessage(formData) {
//     const sentMessage = await deliverMessage(formData.get("message"));
//     setMessages((messages) => [...messages, { text: sentMessage }]);
//   }

//   return <Thread messages={messages} sendMessage={sendMessage} />;
// }
