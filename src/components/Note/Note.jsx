import { useEffect } from 'react';
import { aggregateDataSelector, useStoreDispatch, useStoreSelector } from '../../store';
import { ANCHOR_LINKS } from '../../constants/anchorLinks';

import './Note.scss';

function getSizeInfo(shape, size) {
  if (!shape || !size) {
    return '';
  }

  switch (shape) {
    case 'servings':
      return `порции, ${size}\u00A0ед.`;
    case 'round':
      return `круглая форма, ${size}\u00A0см в диаметре`;
    case 'rectangle':
      return `прямоугольная форма, ${size}\u00A0см по длине и ширине`;
    case 'square': 
      return `квадратная форма, ${size}\u00A0см по длине и ширине`;
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
    <div role="note" className="recipe-calculator__note">
      <p>
        {multiplier ? 'Вес ∕ объём каждного ингредиента перемножается на: ' : ''}
        <b>{multiplier ? multiplier : ''}</b>
      </p>

      <p>Исходные данные из рецепта:&ensp;
        <b>
          {getSizeInfo(inputShape, inputSize) || <a href={'#' + ANCHOR_LINKS.STEP1_MEASURES}>укажите выше&nbsp;⬆</a>}
        </b>
      </p>

      <p>Желаемые параметры для пересчёта:&ensp;
        <b>
          {getSizeInfo(outputShape, outputSize) || <a href={'#' + ANCHOR_LINKS.STEP2_MEASURES}>укажите выше&nbsp;⬆</a>}
        </b>
      </p>

      <p>Рекомендуем перепроверять полученные данные, поскольку в редких случаях алгоритм 
        может не обработать их должным образом, в частности когда исходный текст рецепта 
        имеет нестандартное форматирование.</p>
    </div>
  );
};
