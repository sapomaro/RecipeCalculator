import { useCallback, useEffect, useRef } from 'react';
import { Textarea } from './Textarea';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';
import { padRecipeNumbers } from '../../utils';

export function TextareaInput({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();
  const textareaRef = useRef(null);
  const firstRenderRef = useRef(true);
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
    dispatch({ action: 'INPUT', name, group, value });
  }, [dispatch, pastedRef, name, group]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (textareaRef.current && textareaRef.current !== document.activeElement) {
      textareaRef.current.focus();
    }
  }, [value]);

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      ref={textareaRef}
      onChange={handleInput}
      onPaste={handlePaste}
    />
  );
};
