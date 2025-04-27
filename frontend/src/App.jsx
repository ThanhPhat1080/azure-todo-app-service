import React from 'react';
import TodoContainer from './components/Todo/TodoContainer';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <ToastProvider>
                <TodoContainer />
            </ToastProvider>
        </ErrorBoundary>
    );
}

export default App;
