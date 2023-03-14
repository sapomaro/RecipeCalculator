export function elementValidationReducer(element) {
  if (element.name === 'servings') {
    if (element.active) {
      return !!(element.value === '' || element.value.match(/^[0-9]+[,.]?[0-9]*$/));
    } else {
      return !!(element.value !== '0' && element.value.match(/^[0-9]+[,.]?[0-9]*$/));
    }
  }
  if (element.name === 'round_pan') {
    if (element.active) {
      return !!(element.value === '' || element.value.match(/^[1-9][0-9]*[,.]?[0-9]*$/));
    } else {
      return !!(element.value.match(/^[1-9][0-9]*[,.]?[0-9]*$/));
    }
  }
  if (element.name === 'rect_pan') {
    if (element.active) {
      return !!(element.value === '' || element.value.match(/^[1-9][0-9]*[,.]?[0-9]*×?[0-9]*[,.]?[0-9]*$/));
    } else {
      return !!(element.value.match(/^[1-9][0-9]*[,.]?[0-9]*×[1-9][0-9]*[,.]?[0-9]*$/));
    }
  }
}
