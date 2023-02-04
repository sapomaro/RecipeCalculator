export function re(regexp, flags = 'gi') {
  return new RegExp(regexp, flags); 
}

export function multireplace(text, replacementsArray) {
  for (const [regexp, replacement] of replacementsArray) {
    regexp.lastIndex = 0;
    text = text.replace(regexp, replacement);
  }
  return text;
}
