import { render, screen } from '@testing-library/react';
import { Note } from './Note';
import { StoreProvider as LocalStoreProvider } from '../../store';

it('should render', () => {
  render(
    <LocalStoreProvider>
      <Note />
    </LocalStoreProvider>
  );

  const noteElement = screen.queryByRole('note');

  expect(noteElement).toBeInTheDocument();
});
