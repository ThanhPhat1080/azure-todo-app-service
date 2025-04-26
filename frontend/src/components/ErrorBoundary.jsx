import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("Error:", error);

        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                    <div className="text-white">
                        <h2>Something went wrong.</h2>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 bg-red-500 px-4 py-2 rounded"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;