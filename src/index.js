import ReactDOM from 'react-dom/client';
import { RecipeCalculator } from './RecipeCalculator';
import { redirectPrettifier } from './utils';

import './index.scss';

redirectPrettifier();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecipeCalculator />
);
