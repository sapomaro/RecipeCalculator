import { render, fireEvent, screen } from '@testing-library/react';
import { useRef } from 'react';
import { Textarea } from './Textarea';

const CustomTextarea = (props) => {
  const ref = useRef(null);

  return (
    <Textarea ref={ref} {...props} />
  );
};

it('should render with value and placeholder', () => {
  const textareaValue = 'Поле для ввода';
  const textareaPlaceholder = 'Печатать сюда';
  const textareaChangeObserver = jest.fn();

  render(
    <CustomTextarea value={textareaValue} placeholder={textareaPlaceholder} onChange={textareaChangeObserver} />
  );

  const textareaElementByValue = screen.queryByText(textareaValue);
  const textareaElementByPlaceholder = screen.queryByPlaceholderText(textareaPlaceholder);
  fireEvent.change(textareaElementByValue, { target: { value: 'text' }});

  expect(textareaElementByValue).toBeInTheDocument();
  expect(textareaElementByPlaceholder).toBeInTheDocument();
  expect(textareaChangeObserver).toHaveBeenCalledTimes(1);
});
