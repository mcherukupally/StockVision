// src/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ padding: 20 }}>
          <h2 style={{ color: 'red' }}>Something went wrong:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
            {error.toString()}
            {info?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
