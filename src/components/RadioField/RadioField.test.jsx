import { render, fireEvent, screen } from '@testing-library/react';
import { RadioField } from './RadioField';
import { StoreProvider as LocalStoreProvider } from '../../store';

const roundPanLabel = /круглая\sформа/i;
const rectPanLabel = /прямоугольная\sформа/i;

const RadioFieldGroup = () => {
  return (
    <LocalStoreProvider>
      <RadioField name="round_pan" group="in" />
      <RadioField name="rect_pan" group="in" />
    </LocalStoreProvider>
  );
};

it('should render', () => {
  render(<RadioFieldGroup />);

  const inputs = screen.queryAllByLabelText(roundPanLabel);

  expect(inputs.length).toBe(2);

  const [inputText, inputRadio] = inputs;

  expect(inputText.type).toBe('text');
  expect(inputText).toBeEnabled();
  expect(inputText).toBeValid();

  expect(inputRadio.type).toBe('radio');
  expect(inputRadio).toBeEnabled();
  expect(inputRadio).toBeValid();
});

it('should be checkable and focusable by label', () => {
  render(<RadioFieldGroup />);

  const inputLabel = screen.queryByText(roundPanLabel);
  const [inputText, inputRadio] = screen.queryAllByLabelText(roundPanLabel);

  expect(inputRadio).not.toBeChecked();
  expect(inputText).not.toHaveFocus();

  fireEvent.click(inputLabel);

  expect(inputRadio).toBeChecked();
  expect(inputText).toHaveFocus();
});

it('should be checkable by input field click', () => {
  render(<RadioFieldGroup />);

  const [inputText, inputRadio] = screen.queryAllByLabelText(rectPanLabel);

  expect(inputRadio).not.toBeChecked();

  fireEvent.click(inputText);

  expect(inputRadio).toBeChecked();
});

it('should be checkable by input field change', () => {
  render(<RadioFieldGroup />);

  const [inputText, inputRadio] = screen.queryAllByLabelText(roundPanLabel);

  expect(inputRadio).not.toBeChecked();

  fireEvent.input(inputText, { target: { value: '1' }});

  expect(inputRadio).toBeChecked();
});

it('should validate', () => {
  render(<RadioFieldGroup />);

  let [inputText, inputRadio] = screen.queryAllByLabelText(rectPanLabel);

  expect(inputRadio).toBeValid();
  expect(inputRadio).not.toBeChecked();
  expect(inputText).toBeValid();
  expect(inputText.value).toBe('...');

  fireEvent.click(inputText);
  fireEvent.blur(inputText);

  expect(inputRadio).toBeInvalid();
  expect(inputText).toBeInvalid();

  fireEvent.change(inputText, { target: { value: '123' }});
  fireEvent.blur(inputText);

  expect(inputRadio).toBeValid();
  expect(inputText).toBeValid();

  fireEvent.change(inputText, { target: { value: 'NaN' }});

  expect(inputRadio).toBeInvalid();
  expect(inputText).toBeInvalid();

  fireEvent.change(inputText, { target: { value: '12x34' }});

  expect(inputRadio).toBeValid();
  expect(inputText).toBeValid();

  [inputText, inputRadio] = screen.queryAllByLabelText(roundPanLabel);

  fireEvent.click(inputText);
  fireEvent.change(inputText, { target: { value: '12x34' }});

  expect(inputRadio).toBeInvalid();
  expect(inputText).toBeInvalid();
});
