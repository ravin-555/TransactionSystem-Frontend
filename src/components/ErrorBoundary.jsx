// A React component that serves as an error boundary to catch JavaScript errors anywhere and set a fallback UI
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to a service like Sentry or LogRocket here
        console.error("Logged Crash:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // The fallback UI shown to the user instead of a white screen
            return (
                <div className="fatal-error-page text-amber-50 bg-[#18042c] min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
                    <h2>Oops! Something went sideways.</h2>
                    <p>The application encountered an unexpected error. Don't worry, your data is safe.</p>
                    <div className="actions space-x-4">
                        <button 
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.location.reload()}>
                            Refresh Page
                        </button>
                        <button
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.location.href = '/'}>
                            Go to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;