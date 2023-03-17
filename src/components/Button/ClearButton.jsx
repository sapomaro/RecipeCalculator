import { Button } from './Button';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';

export function ClearButton({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const { value } = state;

  const clearLabel = '⌦ Очистить';
  const cancelLabel = '↺ Вернуть';
  const label = (value === 'clear') ? clearLabel : cancelLabel;

  const handleClick = () => {
    if (value === 'clear') {
      dispatch({ action: 'CLEAR' });
    } else {
      dispatch({ action: 'RESTORE' });
    }
  };

  return (
    <Button label={label} onClick={handleClick} />
  );
};
