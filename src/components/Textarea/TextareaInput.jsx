import { Textarea } from './Textarea';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';
import { formatRecipe } from '../../utils';

export function TextareaInput({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const { value } = state;

  const placeholder = `Скопируйте сюда список ингредиентов...`;

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

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      onChange={handleInput}
      onPaste={handlePaste}
    />
  );
};
