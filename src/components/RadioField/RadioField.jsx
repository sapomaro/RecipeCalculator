import { useEffect, useRef } from 'react';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';

import './RadioField.scss';

export function RadioField({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const fieldRef = useRef(null);
	const radioRef = useRef(null);

  const { value, category, active, checked, valid, disabled } = state;

  const id = name + '_' + group;

  const maxLength = 7;

  const disabledValue = '✕';

  const blurredValue = '...';

  const label =
    (name === 'servings') ? 'Количество\nпорций' :
    (name === 'round_pan') ? 'Круглая\nформа' :
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

  const empty = (value === '');
  const [sublabelTopEmpty, sublabelBottomEmpty] =
    ['⚠ Укажите', 'значение'];

  const hintIfDisabled =
    (disabled && category === 'pans') ? 'Нельзя пересчитать размеры формы для выпечки в количество порций. ' +
      'Если вам нужны именно порции, выберите соответствующую опцию выше в шаге №1.' :
    (disabled && category === 'volume') ? 'Нельзя пересчитать количество порций в размеры формы для выпечки. ' +
      'Если вам нужны именно формы для выпечки, выберите соответствующую опцию выше в шаге №1.' :
    '';

  const handleCheck = () => {
    if (!disabled && !active) {
      if (value === blurredValue) {
        dispatch({ action: 'INPUT', name, group, value: '' });
      }
      dispatch({ action: 'CHECK', name, group, category });
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
		dispatch({ action: 'INPUT', name, group, value });
  };

  const handleBlur = (event) => {
		let value = event.target.value;
		if (name === 'rect_pan') {
			if (value.match(/^[0-9]+[,.]?[0-9]*$/)) {
				value = `${value}×${value}`.slice(0, maxLength);
			}
		}
    dispatch({ action: 'BLUR', name, group, value });
  };

  useEffect(() => {
    if (!fieldRef.current || !radioRef.current) {
      return null;
    }

    if (!hasError) {
      fieldRef.current.setCustomValidity('');
      radioRef.current.setCustomValidity('');
    } else {
      fieldRef.current.setCustomValidity('invalid');
      radioRef.current.setCustomValidity('invalid');
    }

    if (active) {
      fieldRef.current.focus();
    }
  });

  const c = 'recipe-calculator__radiofield';
  const emptySelector = (empty) ? `${c}__input_radio_empty` : '';

  return (
		<div className={`${c}`} key={id} title={hintIfDisabled}>
			<input type="radio" className={`${c}__input_radio ${emptySelector}`}
        id={id}
        name={group}
				ref={radioRef}
				checked={checked}
				disabled={disabled}
        onChange={handleCheck}
			/>

			<label className={`${c}__content`}
        htmlFor={id}
        onClick={handleCheck}
      >
				<span className={`${c}__shape ${c}__shape_${name}`}>
          <span className={`${c}__sublabel`}>
            {!hasError ? sublabelTopNormal : empty ? sublabelTopEmpty : sublabelTopError}
          </span>

          <input type="text" inputMode="numeric" className={`${c}__input_text`} 
            ref={fieldRef}
            maxLength={maxLength}
            value={disabled ? disabledValue : (checked ? value : blurredValue)}
            onChange={handleInput}
            onClick={handleCheck}
            onInput={handleCheck}
            onBlur={handleBlur}
            disabled={disabled}
          />

          <span className={`${c}__sublabel`}>
            {!hasError ? sublabelBottomNormal : empty ? sublabelBottomEmpty : sublabelBottomError}
          </span>
				</span>

				<span className={`${c}__label`}>
          {label}
        </span>
			</label>
		</div>
  );
};
