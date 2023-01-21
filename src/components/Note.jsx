import { aggregateDataSelector, useStoreSelector } from '../store';

import './Note.scss';

export function Note() {
  const data = useStoreSelector(aggregateDataSelector);

  const { inputShape, inputSize, multiplier, outputShape, outputSize } = data;

	const getSizeInfo = (shape, size) => {
		if (!shape || !size) {
      return '';
    }

		switch (shape) {
			case 'servings':
        return `порции, ${size} ед.`;
			case 'round':
        return `круглая форма, ${size} см в диаметре`;
			case 'rectangle':
        return `прямоугольная форма, ${size} см по длине и ширине`;
      case 'square': 
				return `квадратная форма, ${size} см по длине и ширине`;
		}
	};

  return (
		<div className="note">
      <p>{multiplier ? 'Вес ∕ объём каждного ингредиента перемножается на: ' + multiplier + '' : ''}</p>

      <p>Исходные данные из рецепта: <b>{getSizeInfo(inputShape, inputSize) || 'укажите выше ⬆'}</b></p>

      <p>Желаемые параметры для пересчёта: <b>{getSizeInfo(outputShape, outputSize) || 'укажите выше ⬆'}</b></p>

			<p>Рекомендуем перепроверять полученные данные, поскольку в редких случаях алгоритм 
        может не обработать их должным образом, в частности когда исходный текст рецепта 
        имеет нестандартное форматирование.</p>
		</div>
  );
};
