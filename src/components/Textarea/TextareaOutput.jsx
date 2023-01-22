import { Textarea } from './Textarea';
import { aggregateDataSelector, useStoreSelector } from '../../store';
import { fixRecipeWordForms, multiplyRecipeNumbers, normalizeRecipeNumbers } from '../../utils';

export function TextareaOutput() {
  const data = useStoreSelector(aggregateDataSelector);

  const multiplier = data.multiplier;
  let value = data.inputRecipe;
  value = normalizeRecipeNumbers(value);
  value = multiplyRecipeNumbers(value, multiplier);
  value = fixRecipeWordForms(value);

  const placeholder = `Здесь появится обновлённый список ингредиентов, когда вы укажете необходимые данные выше ⬆`;

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      readonly={true}
    />
  );
};
