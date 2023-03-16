import './Button.scss';

export function Button({ label, onClick }) {
  return (
    <button className="recipe-calculator__button" onClick={onClick}>{label}</button>
  );
};
