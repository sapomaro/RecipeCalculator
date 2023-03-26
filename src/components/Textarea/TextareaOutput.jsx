import { useRef } from 'react';
import { Textarea } from './Textarea';
import { aggregateDataSelector, useStoreSelector } from '../../store';
import { fixRecipeWordForms, multiplyRecipeNumbers, normalizeRecipeNumbers } from '../../utils';

export function TextareaOutput({ group }) {
  const data = useStoreSelector(aggregateDataSelector);
  const textareaRef = useRef(null);

  const multiplier = data.multiplier;
  let value = data.inputRecipe;
  value = normalizeRecipeNumbers(value);
  value = multiplyRecipeNumbers(value, multiplier);
  value = fixRecipeWordForms(value);

  const placeholder = 'Здесь появится обновлённый список ингредиентов, когда вы укажете необходимые данные';

  const title = 'Поле с результатами расчётов';

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      title={title}
      group={group}
      ref={textareaRef}
      readonly={true}
    />
  );
};
