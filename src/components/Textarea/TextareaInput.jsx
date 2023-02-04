import { useCallback, useRef } from 'react';
import { Textarea } from './Textarea';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';
import { padRecipeNumbers } from '../../utils';

export function TextareaInput({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();
  const pastedRef = useRef(false);

  const { value } = state;

  const placeholder = `Скопируйте сюда список ингредиентов...`;

  const pasteTimeout = 16;

  const handlePaste = useCallback(() => {
		pastedRef.current = true;
		setTimeout(() => { pastedRef.current = false; }, pasteTimeout);
  }, [pastedRef]);

  const handleInput = useCallback((event) => {
    let value = event.target.value;
    if (pastedRef.current) {
			value = padRecipeNumbers(value);
		}
    dispatch({ action: 'TYPED', name, group, value });
  }, [dispatch, pastedRef, name, group]);

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      onChange={handleInput}
      onPaste={handlePaste}
    />
  );
};
