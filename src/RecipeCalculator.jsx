import { StoreProvider as LocalStoreProvider } from './store';
import { ErrorBoundary, Note, RadioField, TextareaInput, TextareaOutput } from './components';

export function RecipeCalculator() {
  return (
    <ErrorBoundary>
      <LocalStoreProvider>

        <h1>Калькулятор ингредиентов и форм для выпечки</h1>

        <h2>Для чего он нужен и как работает</h2>

        <p>Вы нашли рецепт, который рассчитан на большое количество порций, 
          а вы хотите приготовить в два раза меньше. Либо в инструкции указана 
          большая круглая форма для выпечки, а у вас есть только маленькая 
          квадратная, и нужно пересчитать количество ингредиентов, чтобы торт 
          получился такой же высоты. Для подобных случаев и создан этот 
          кулинарный калькулятор.
        </p>

        <hr />

        <h2>Шаг №1: укажите исходные данные из рецепта</h2>

        <h3>Количество порций ∕ размеры формы для выпечки:</h3>

        <RadioField name="servings" group="in" />
        <RadioField name="round_pan" group="in" />
        <RadioField name="rect_pan" group="in" />

        <h3>Ингредиенты:</h3>

        <TextareaInput name="ingredients" group="in" />

        <hr />

        <h2>Шаг №2: укажите желаемые параметры для пересчёта</h2>

        <h3>Новое количество порций ∕ размеры вашей формы для выпечки:</h3>

        <RadioField name="servings" group="out" />
        <RadioField name="round_pan" group="out" />
        <RadioField name="rect_pan" group="out" />

        <h3>Результат рассчётов:</h3>

        <TextareaOutput name="ingredients" group="out" />

        <Note name="summary" group="out" />

      </LocalStoreProvider>
    </ErrorBoundary>
  );
}
