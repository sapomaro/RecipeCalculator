import { useEffect, useRef } from 'react';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';

import './RadioField.scss';

export function RadioField({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const fieldRef = useRef(null);
	const radioRef = useRef(null);

  const { value, category, active, checked, valid, disabled } = state;

  const id = name + group;

  const maxLength = 7;

  const disabledValue = '✕';

  const blurredValue = '...';

  const label =
    (name === 'servings') ? 'Количество\nпорций' :
    (name === 'round_pan') ? 'Круглая форма' :
    (name === 'rect_pan') ? ' Квадратная ∕\nпрямоугольная\nформа' :
    '';

  const [sublabelTopNormal, sublabelBottomNormal] =
    (name === 'servings') ? ['÷ Количество', '(ед.)'] :
    (name === 'round_pan') ? ['⌀ Диаметр', '(см)'] :
    (name === 'rect_pan') ? ['⊞ Длина × ширина', '(см)'] :
    ['', ''];

  const hasError = !(valid || (!active && !checked));
  const [sublabelTopError, sublabelBottomError] =
    ['⚠ Неверное', 'значение'];

  const hintIfDisabled =
    (disabled && category === 'pans') ? 'Нельзя пересчитать размеры формы для выпечки в количество порций. ' +
      'Если вам нужны именно порции, выберите соответствующую опцию выше в шаге №1.' :
    (disabled && category === 'volume') ? 'Нельзя пересчитать количество порций в размеры формы для выпечки. ' +
      'Если вам нужны именно формы для выпечки, выберите соответствующую опцию выше в шаге №1.' :
    '';

  const handleCheck = () => {
    if (!disabled) {
      dispatch({ action: 'CHECKED', name, group, category });
    }

    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  };

  const handleInput = (event) => {
		let value = event.target.value;
		if (name === 'rect_pan') {
			value = value.replace(/^([0-9,.]+)[^0-9,.]+([0-9,.]*)$/, "$1×$2");
		}
		dispatch({ action: 'TYPED', name, group, value });
  };

  const handleBlur = (event) => {
		let value = event.target.value;
		if (name === 'rect_pan') {
			if (value.match(/^[0-9]+[,.]?[0-9]*$/)) {
				value = `${value}×${value}`.slice(0, maxLength);
			}
		}

    dispatch({ action: 'BLURRED', name, group, value });
  };

  useEffect(() => {
    if (!fieldRef.current || !radioRef.current) {
      return null;
    }

    if (!hasError) {
      fieldRef.current.setCustomValidity('');
      radioRef.current.setCustomValidity('');
    }
    else {
      fieldRef.current.setCustomValidity('invalid');
      radioRef.current.setCustomValidity('invalid');
    }

    if (active) {
      fieldRef.current.focus();
    }
  });

  return (
		<div className="radiofield" key={id} title={hintIfDisabled}>
			<input type="radio" className="radiofield__input_radio"
        id={id}
				ref={radioRef}
				checked={checked}
				disabled={disabled}
        onChange={handleCheck}
			/>

			<label className="radiofield__content"
        htmlFor={id}
        onClick={handleCheck}
      >
				<span className={`radiofield__shape radiofield__shape_${name}`}>
          <span className="radiofield__sublabel">
            {!hasError ? sublabelTopNormal : sublabelTopError}
          </span>

					<input type="text" className="radiofield__input_text" 
						ref={fieldRef}
						maxLength={maxLength}
						value={disabled ? disabledValue : (checked ? value : blurredValue)}
						onChange={handleInput}
						onClick={handleCheck}
						onInput={handleCheck}
						onBlur={handleBlur}
						disabled={disabled}
					/>

          <span className="radiofield__sublabel">
            {!hasError ? sublabelBottomNormal : sublabelBottomError}
          </span>
				</span>

				<span className="radiofield__label">
          {label}
        </span>
			</label>
		</div>
  );
};
