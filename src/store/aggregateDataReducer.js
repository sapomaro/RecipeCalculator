export function aggregateDataReducer(state, element) {
  const updatedData = {};

  if (element.type === 'radiofield' && element.checked) {
    if (element.group === 'in') {
      if (element.valid) {
        updatedData.inputSize = element.value;
        updatedData.inputShape = getShape(element.name, element.value);
        updatedData.inputVolume = getVolume(updatedData.inputShape, element.value);
        updatedData.outputSize = '';
        updatedData.outputShape = '';
        updatedData.outputVolume = 0;
      } else {
        updatedData.inputSize = '';
        updatedData.inputShape = '';
        updatedData.inputVolume = 0;
      }
    } else {
      if (element.valid) {
        updatedData.outputSize = element.value;
        updatedData.outputShape = getShape(element.name, element.value);
        updatedData.outputVolume = getVolume(updatedData.outputShape, element.value);
      } else {
        updatedData.outputSize = '';
        updatedData.outputShape = '';
        updatedData.outputVolume = 0;
      }
    }
    updatedData.multiplier = getMultiplier(updatedData.inputVolume || state.inputVolume, updatedData.outputVolume);
  }
  if (element.type === 'textarea' && element.group === 'in') {
    updatedData.inputRecipe = element.value;
  }

  return { ...state, ...updatedData };
}

function getShape(name, value) {
  if (name === 'servings') {
    return 'servings';
  }
  if (name === 'round_pan') {
    return 'round';
  }
  if (name === 'rect_pan') {
    const sides = value.split(/[^0-9,\.]+/);
    if ('undefined' !== typeof sides[1] && sides[0] !== sides[1]) {
      return 'rectangle';
    }
    else {
      return 'square';
    }
  }
}

function getVolume(shape, value) {
	let volume = 0;

	if (value !== '') {
		value = value.replace(',', '.');

		if (shape === 'servings') {
			volume = parseFloat(value);
		} 
		else if (shape === 'round') {
			volume = Math.PI * Math.pow(parseFloat(value) / 2, 2);
		} 
		else if (shape === 'rectangle' || shape === 'square') {
			const sides = value.split(/[^0-9,\.]+/);
			volume = parseFloat(sides[0]) * parseFloat(sides[1]);
		}
	}

	return Math.round(volume * 100) / 100;
}

function getMultiplier(inputVolume, outputVolume) {
	if (inputVolume && outputVolume) {
		return Math.round(outputVolume / inputVolume * 1000) / 1000;
	}
	else {
		return 0;
	}
};
