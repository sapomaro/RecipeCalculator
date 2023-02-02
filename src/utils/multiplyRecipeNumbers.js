export function multiplyRecipeNumbers(text, multiplier) {

  return text.split(/\n+/).map((line) => {
    if (line === '') {
      return;
    }

    let matches;
    let entry = line;

    // find all numbers/floats without trailing %
    const regex = /(\d+\.?\d*)(?!\d*\.?\d*\s?-?\s?\d*\.?\d*\s?%)/g;

    while (matches = regex.exec(entry)) {
      const matchedNumber = matches[1];
      if (typeof matchedNumber === 'undefined') {
        continue;
      }

      const oldQuantity = parseFloat(matchedNumber);
      if (isNaN(oldQuantity)) {
        continue;
      }

      let newQuantity = oldQuantity * multiplier;

      if (newQuantity > 20) {
        newQuantity = Math.round(newQuantity);
      }
      else if (newQuantity > 10) {
        newQuantity = Math.round(newQuantity * 2) / 2;
      }
      else if (newQuantity > 0.1) {
        newQuantity = Math.round(newQuantity * 10) / 10;
      }
      else { 
        let microQuantity = Math.round(newQuantity * 100) / 100;
        newQuantity = (microQuantity === 0 ? newQuantity : microQuantity); 
      }

      let index = regex.lastIndex - matchedNumber.length;
      entry = entry.slice(0, index) +
        entry.slice(index).replace(matchedNumber.replace('.', '\.'), newQuantity.toString(10));

      regex.lastIndex += newQuantity.toString().length - matchedNumber.length;
    }

    return entry;
  }).join('\n');
}
