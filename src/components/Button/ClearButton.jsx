import { Button } from './Button';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';

export function ClearButton({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const { value } = state;

  const clearLabel = '⌦ Очистить';
  const cancelLabel = '↺ Вернуть обратно';

  const label = (value === '') ? clearLabel : cancelLabel;

  const handleClick = () => {
    dispatch({ action: 'CLEAR' });
  };

  return (
    <Button label={label} onClick={handleClick} />
  );
};
