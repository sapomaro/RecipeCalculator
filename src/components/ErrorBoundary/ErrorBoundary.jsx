import { Component } from 'react';
import { clearStorage } from '../../store';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    try {
      clearStorage();
      console.warn('Store was cleared due to an error');
    } catch (error) {
      console.warn(error);
    }
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="recipe-calculator__section">
          <h1>Калькулятор внезапно поломался</h1>
          <h2>Перезагрузка страницы должна помочь, но это неточно</h2>
          <p>Если что, нужно нажать <kbd>Ctrl</kbd> + <kbd>F5</kbd>.</p>
        </section>
      );
    }
    return this.props.children;
  }
}
