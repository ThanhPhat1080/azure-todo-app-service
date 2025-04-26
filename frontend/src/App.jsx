import React from 'react';
import TodoContainer from './components/Todo/TodoContainer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <TodoContainer />
        </ErrorBoundary>
    );
}

export default App;
