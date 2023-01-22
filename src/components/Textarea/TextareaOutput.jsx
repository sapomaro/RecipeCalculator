import { Textarea } from './Textarea';
import { aggregateDataSelector, useStoreSelector } from '../../store';

export function TextareaOutput() {
  const data = useStoreSelector(aggregateDataSelector);

  const value = data.inputRecipe;

  const placeholder = `Здесь появится обновлённый список ингредиентов, когда вы укажете необходимые данные выше ⬆`;

  return (
    <Textarea
      value={value}
      placeholder={placeholder}
      readonly={true}
    />
  );
};
