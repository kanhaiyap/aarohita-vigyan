import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full border border-slate-200 rounded-2xl p-6 bg-white shadow">
            <h1 className="text-xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-slate-600">
              The page failed to render. Please try again later.
            </p>
            <pre className="mt-3 p-2 text-xs bg-slate-50 border border-slate-200 rounded overflow-auto">
              {String(this.state.error)}
            </pre>
            <button
              onClick={this.handleRetry}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
