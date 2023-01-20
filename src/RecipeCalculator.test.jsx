import { render, screen } from '@testing-library/react';
import { RecipeCalculator } from './RecipeCalculator';

test('renders learn react link', () => {
  render(<RecipeCalculator />);
  const linkElement = screen.getByText(/калькулятор/i);
  expect(linkElement).toBeInTheDocument();
});
