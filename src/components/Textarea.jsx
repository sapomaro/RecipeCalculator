import { useEffect, useRef } from 'react';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../store';
import { autoResize, formatRecipe } from '../utils';

import './Textarea.scss';

export function Textarea({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

	const textareaRef = useRef(null);

  const { value } = state;

  const readonly = (group === 'out') ? true : false;

  const placeholder = (group === 'in') ? `Скопируйте сюда список ингредиентов...` :
    `Здесь появится обновлённый список ингредиентов, когда вы укажете необходимые данные выше ⬆`;

  let pasted = false;
  const pasteTimeout = 16;

  const handlePaste = () => {
		pasted = true;
		setTimeout(() => { pasted = false; }, pasteTimeout);
  };

  const handleInput = (event) => {
    let value = event.target.value;
    if (pasted) {
			value = formatRecipe(value);
		}
    dispatch({ action: 'TYPED', name, group, value });
  };

  useEffect(() => {
		if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
	});

  return (
    <div className="textarea__wrapper">
      <div className="textarea__placeholder">
        {value === '' ? placeholder : ''}
      </div>
      <textarea className="textarea__input" 
        ref={textareaRef}
        value={value} 
        onPaste={handlePaste}
        onChange={handleInput}
        readOnly={readonly}
      ></textarea>
    </div>
  );
};
