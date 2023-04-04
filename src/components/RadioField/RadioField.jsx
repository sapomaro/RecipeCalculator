import { useCallback, useEffect, useRef } from 'react';
import { elementSelector, useStoreDispatch, useStoreSelector } from '../../store';
import { disableScrolling, enableScrolling } from '../../utils';

import styles from './RadioField.module.scss';

export function RadioField({ name, group }) {
  const state = useStoreSelector(elementSelector({ name, group }));
  const dispatch = useStoreDispatch();

  const shapeRef = useRef(null);
  const fieldRef = useRef(null);
  const radioRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const wheelAllowedRef = useRef(false);
  const allowWheelTimeout = 500;

  const { value, category, active, checked, valid, disabled } = state;

  const id = name + '_' + group;

  const maxLength = 7;
  const dimensionsDelimeter = '×';

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
      value = value.replace(/^([0-9,.]+)[^0-9,.]+([0-9,.]*)$/, '$1' + dimensionsDelimeter + '$2');
    }
    dispatch({ action: 'INPUT', name, group, value });
  };

  const handleBlur = (event) => {
    let value = event.target.value;
    if (name === 'rect_pan') {
      if (value.match(/^[0-9]+[,.]?[0-9]*$/)) {
        value = `${value}${dimensionsDelimeter}${value}`.slice(0, maxLength);
      }
    }
    dispatch({ action: 'BLUR', name, group, value });
  };

  const handleCounter = useCallback((amount, isLeftSide) => {
    let newValue = 0;
    let newLeftValue = 0;
    let newRightValue = 0;
    if (name === 'rect_pan') {
      if (value.indexOf(dimensionsDelimeter) === -1) {
        return;
      }
      const [oldLeftValue, oldRightValue] = value.split(dimensionsDelimeter);

      if (isLeftSide) {
        newLeftValue = parseInt(oldLeftValue || 0) + amount;
        newRightValue = oldRightValue;
        if (newLeftValue < 1) {
          return;
        }
      } else {
        newLeftValue = oldLeftValue;
        newRightValue = parseInt(oldRightValue || 0) + amount;
        if (newRightValue < 1) {
          return;
        }
      }
      newValue = newLeftValue + dimensionsDelimeter + newRightValue;
    } else {
      newValue = parseInt(value || 0) + amount;
      if (newValue < 1) {
        return;
      }
    }

    dispatch({ action: 'INPUT', name, group, value: newValue + '' });
  }, [name, value, group, dispatch]);

  const handleWheel = useCallback((event) => {
    if (checked && wheelAllowedRef.current) {
      let isLeftSide = true;
      if (name === 'rect_pan' && event.currentTarget && event.clientX) {
        const rect = event.currentTarget.getBoundingClientRect();
        isLeftSide = (event.clientX - rect.left) < (event.currentTarget.offsetWidth / 2);
      }

      if (event.deltaY < 0) {
        handleCounter(1, isLeftSide);
      } else {
        handleCounter(-1, isLeftSide);
      }

      return false;
    }
  }, [name, checked, handleCounter]);

  const handleMouse = (event) => {
    if (!checked) {
      return;
    }

    if (event.type === 'mouseover') {
      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current);
        wheelAllowedRef.current = false;
      }
      wheelTimerRef.current = setTimeout(() => {
        wheelAllowedRef.current = true;
        disableScrolling();
      }, allowWheelTimeout);
    } else if (event.type === 'mouseout') {
      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = null;
      }
      wheelAllowedRef.current = false;
      enableScrolling();
    }
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

    if (!shapeRef.current) {
      return null;
    }
    const shapeRefNode = shapeRef.current;
    shapeRefNode.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (shapeRefNode) {
        shapeRefNode.removeEventListener('wheel', handleWheel, { passive: false });
      }
    };
  });

  const emptySelector = (empty) ? styles.radiofield__input_radio_empty : '';

  return (
    <div className={styles.radiofield} key={id} title={hintIfDisabled}>
      <input type="radio" className={`${styles.radiofield__input_radio} ${emptySelector}`}
        id={id}
        name={group}
        ref={radioRef}
        checked={checked}
        disabled={disabled}
        onChange={handleCheck}
      />

      <label className={styles.radiofield__content}
        htmlFor={id}
        onClick={handleCheck}
      >
        <span className={`
            ${styles.radiofield__shape} 
            ${styles['radiofield__shape_' + name]} 
            ${styles['radiofield__shape_' + group]}
          `}
          ref={shapeRef}
          onMouseOver={handleMouse}
          onMouseOut={handleMouse}
        >
          <span className={styles.radiofield__sublabel}>
            {!hasError ? sublabelTopNormal : empty ? sublabelTopEmpty : sublabelTopError}
          </span>

          <input type="text" inputMode="numeric" className={styles.radiofield__input_text} 
            ref={fieldRef}
            maxLength={maxLength}
            value={disabled ? disabledValue : (checked ? value : blurredValue)}
            onChange={handleInput}
            onClick={handleCheck}
            onInput={handleCheck}
            onBlur={handleBlur}
            disabled={disabled}
          />

          <span className={styles.radiofield__sublabel}>
            {!hasError ? sublabelBottomNormal : empty ? sublabelBottomEmpty : sublabelBottomError}
          </span>
        </span>

        <span className={styles.radiofield__label}>
          {label}
        </span>
      </label>
    </div>
  );
};
