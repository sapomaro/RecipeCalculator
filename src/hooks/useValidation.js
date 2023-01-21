import { useState } from 'react';

export function useValidation(item) {
  const [isValid, setValidity] = useState(true);

  const validate = () => {
    setValidity(validateRadioField(item) ?? true);
  };

  return [isValid, validate];
}

function validateRadioField(item) {
  if (!item.checked && !item.active) {
    return true;
  }
  if (item.name === 'servings') {
    if (item.active) {
      return !!(item.value === '' || item.value.match(/^[0-9]+[,\.]?[0-9]*$/));
    } else {
      return !!(item.value !== '0' && item.value.match(/^[0-9]+[,\.]?[0-9]*$/));
    }
  }
  if (item.name === 'round_pan') {
    if (item.active) {
      return !!(item.value === '' || item.value.match(/^[1-9][0-9]*[,\.]?[0-9]*$/));
    } else {
      return !!(item.value.match(/^[1-9][0-9]*[,\.]?[0-9]*$/));
    }
  }
  if (item.name === 'rect_pan') {
    if (item.active) {
      return !!(item.value === '' || item.value.match(/^[1-9][0-9]*[,\.]?[0-9]*×?[0-9]*[,\.]?[0-9]*$/));
    } else {
      return !!(item.value.match(/^[1-9][0-9]*[,\.]?[0-9]*×[1-9][0-9]*[,\.]?[0-9]*$/));
    }
  }
}
