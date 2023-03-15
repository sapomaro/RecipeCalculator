import { useEffect } from 'react';
import { aggregateDataSelector, useStoreDispatch, useStoreSelector } from '../../store';

import './Note.scss';

function getSizeInfo(shape, size) {
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
    default:
      return '';
  }
}

export function Note() {
  const data = useStoreSelector(aggregateDataSelector);
  const dispatch = useStoreDispatch();

  const { inputShape, inputSize, multiplier, outputShape, outputSize } = data;

  useEffect(() => {
    dispatch({ action: 'INIT' });
  }, [dispatch]);

  return (
		<div className="recipe-calculator__note">
      <p>
        {multiplier ? 'Вес ∕ объём каждного ингредиента перемножается на: ' : ''}
        <b>{multiplier ? multiplier : ''}</b>
      </p>

      <p>Исходные данные из рецепта:&ensp;
        <b>
          {getSizeInfo(inputShape, inputSize) || <a href="#step1-recipe-measures">укажите выше&nbsp;⬆</a>}
        </b>
      </p>

      <p>Желаемые параметры для пересчёта:&ensp;
        <b>
          {getSizeInfo(outputShape, outputSize) || <a href="#step2-recipe-measures">укажите выше&nbsp;⬆</a>}
        </b>
      </p>

			<p>Рекомендуем перепроверять полученные данные, поскольку в редких случаях алгоритм 
        может не обработать их должным образом, в частности когда исходный текст рецепта 
        имеет нестандартное форматирование.</p>
		</div>
  );
};
