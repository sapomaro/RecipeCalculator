export function multiplyRecipeNumbers(text, multiplier) {

  return text.split(/\n+/).map((line) => {
    if (line === '') {
      return;
    }

    let matches;
    let entry = line;

    // find all numbers/floats without trailing %
    const regex = /(\d+\.?\d*)(?!\d*\s?-?\s?\d*\s?%)/g;

    while (matches = regex.exec(entry)) {
      const oldQuantity = parseFloat(matches[1]);
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

      let index = regex.lastIndex - matches[1].length;
      entry = entry.slice(0, index) +
        entry.slice(index).replace(matches[1].replace('.', '\.'), newQuantity.toString(10));

      regex.lastIndex += newQuantity.toString().length - matches[1].length;
    }

    return entry;
  }).join('\n');
}
