import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

window.console.warn = jest.fn();
window.console.error = jest.fn();

it('should not render when there is no error', () => {
  render(
    <ErrorBoundary>
      <h1>Всё работает нормально</h1>
    </ErrorBoundary>
  );

  const normalHeader = screen.queryByText(/Всё работает нормально/i);
  const errorHeader = screen.queryByText(/Калькулятор внезапно поломался/i);

  expect(normalHeader).toBeInTheDocument();
  expect(errorHeader).not.toBeInTheDocument();
});

it('should render on error', () => {
  const ErrorComponent = () => {
    throw new Error('test error');
  };

  render(
    <ErrorBoundary>
      <h1>Всё работает нормально</h1>
      <ErrorComponent />
    </ErrorBoundary>
  );

  const normalHeader = screen.queryByText(/Всё работает нормально/i);
  const errorHeader = screen.queryByText(/Калькулятор внезапно поломался/i);

  expect(normalHeader).not.toBeInTheDocument();
  expect(errorHeader).toBeInTheDocument();
});
