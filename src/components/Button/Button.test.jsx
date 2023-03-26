import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';

it('should render and be clickable', () => {
  const buttonClickObserver = jest.fn();
  const buttonLabel = 'Кнопка';

  render(
    <Button label={buttonLabel} onClick={buttonClickObserver} />
  );

  const buttonElement = screen.queryByText(buttonLabel);
  fireEvent.click(buttonElement);

  expect(buttonElement).toBeInTheDocument();
  expect(buttonClickObserver).toHaveBeenCalledTimes(1);
});
