import ReactDOM from 'react-dom/client';
import { RecipeCalculator } from './RecipeCalculator';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <main className="container">
    <RecipeCalculator />
  </main>
);
