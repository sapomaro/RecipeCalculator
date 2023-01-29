import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Калькулятор внезапно поломался</h1>
          <h2>Перезагрузка страницы должна помочь, но это неточно</h2>
          <p>Если что, нужно нажать <kbd>Ctrl</kbd> + <kbd>F5</kbd>.</p>
        </>
      );
    }
    return this.props.children;
  }
}
