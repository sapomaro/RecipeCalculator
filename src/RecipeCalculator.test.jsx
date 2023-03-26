import { render, fireEvent, screen } from '@testing-library/react';
import { RecipeCalculator } from './RecipeCalculator';

function renderUI() {
  const ui = { in: {}, out: {} };

  render(<RecipeCalculator />);

  [ui.in.servingsText, ui.in.servingsRadio, ui.out.servingsText, ui.out.servingsRadio] =
    screen.queryAllByLabelText(/количество\sпорций/i);
  [ui.in.roundPanText, ui.in.roundPanRadio, ui.out.roundPanText, ui.out.roundPanRadio] =
    screen.queryAllByLabelText(/круглая\sформа/i);
  [ui.in.rectPanText, ui.in.rectPanRadio, ui.out.rectPanText, ui.out.rectPanRadio] =
    screen.queryAllByLabelText(/прямоугольная\sформа/i);

  ui.in.recipeTextarea = screen.getByTitle('Поле для ввода ингредиентов');
  ui.out.recipeTextarea = screen.getByTitle('Поле с результатами расчётов');

  ui.in.clearButton = screen.getByText(/очистить/i);

  return ui;
}

it('should render with all components', () => {
  const ui = renderUI();

  expect(screen.getByText(/Калькулятор ингредиентов/i)).toBeInTheDocument();

  expect(ui.in.servingsText).toBeInTheDocument();
  expect(ui.in.servingsRadio).toBeInTheDocument();
  expect(ui.in.roundPanText).toBeInTheDocument();
  expect(ui.in.roundPanRadio).toBeInTheDocument();
  expect(ui.in.rectPanText).toBeInTheDocument();
  expect(ui.in.rectPanRadio).toBeInTheDocument();

  expect(ui.out.servingsText).toBeInTheDocument();
  expect(ui.out.servingsRadio).toBeInTheDocument();
  expect(ui.out.roundPanText).toBeInTheDocument();
  expect(ui.out.roundPanRadio).toBeInTheDocument();
  expect(ui.out.rectPanText).toBeInTheDocument();
  expect(ui.out.rectPanRadio).toBeInTheDocument();
});

it('should load initial state', () => {
  const ui = renderUI();

  expect(ui.in.servingsRadio).toBeEnabled();
  expect(ui.in.servingsRadio).toBeChecked();
  expect(ui.in.servingsText.value).toBe('1');

  expect(ui.in.recipeTextarea.value).toBe('');

  expect(ui.in.roundPanText).toBeEnabled();
  expect(ui.in.roundPanRadio).toBeEnabled();
  expect(ui.in.roundPanRadio).not.toBeChecked();

  expect(ui.in.rectPanText).toBeEnabled();
  expect(ui.in.rectPanRadio).toBeEnabled();
  expect(ui.in.rectPanRadio).not.toBeChecked();

  expect(ui.out.servingsRadio).toBeEnabled();
  expect(ui.out.servingsRadio).toBeChecked();
  expect(ui.out.servingsText.value).toBe('2');

  expect(ui.out.recipeTextarea.value).toBe('');

  expect(ui.out.roundPanText).toBeDisabled();
  expect(ui.out.roundPanRadio).toBeDisabled();

  expect(ui.out.rectPanText).toBeDisabled();
  expect(ui.out.rectPanRadio).toBeDisabled();
});

it('should calculate based on servings', () => {
  const ui = renderUI();

  fireEvent.change(ui.in.recipeTextarea, { target: { value: 'Jest - 100 гр\nRTL - 200 гр' }});

  expect(ui.out.recipeTextarea.value).toBe('Jest - 200 гр\nRTL - 400 гр');
});

it('should calculate based on servings', () => {
  const ui = renderUI();

  fireEvent.click(ui.in.roundPanText);
  fireEvent.change(ui.in.roundPanText, { target: { value: '12' }});

  fireEvent.change(ui.in.recipeTextarea, { target: { value: 'Jest - 100 гр\nRTL - 200 гр' }});

  fireEvent.click(ui.out.roundPanText);
  fireEvent.change(ui.out.roundPanText, { target: { value: '18' }});

  expect(ui.out.recipeTextarea.value).toBe('Jest - 225 гр\nRTL - 450 гр');

  expect(ui.in.servingsRadio).not.toBeChecked();
  expect(ui.in.roundPanRadio).toBeChecked();
  expect(ui.in.rectPanRadio).not.toBeChecked();

  expect(ui.out.servingsRadio).not.toBeChecked();
  expect(ui.out.servingsRadio).toBeDisabled();
  expect(ui.out.servingsText).toBeDisabled();

  expect(ui.out.roundPanRadio).toBeChecked();
  expect(ui.out.roundPanRadio).toBeEnabled();
  expect(ui.out.roundPanText).toBeEnabled();

  expect(ui.out.rectPanRadio).not.toBeChecked();
  expect(ui.out.rectPanRadio).toBeEnabled();
  expect(ui.out.rectPanText).toBeEnabled();
});
