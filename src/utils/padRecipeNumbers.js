import { re } from './regexpUtils';

const padSymbol = '.';

const minPadLength = 3;

const padFormulasOpeners = {
  standard: '^([^\\d]{4,})\\s+',
  percentage: '^([^%\\d]*\\d*[.,]?\\d*\\s?-?\\s?\\d*[.,]?\\d*\\s?%[^%\\d]*)\\s+'
};

const padFormulasEndings = {
  measure: '(\\d[\\d/.,-]*)([^\\d]+)$',
  totaste: '(по )(вкусу)$',
};

const padFormulas = [
  re(padFormulasOpeners.standard + padFormulasEndings.measure, ''),
  re(padFormulasOpeners.standard + padFormulasEndings.totaste, ''),
  re(padFormulasOpeners.percentage + padFormulasEndings.measure, ''),
  re(padFormulasOpeners.percentage + padFormulasEndings.totaste, ''),
];

export function padRecipeNumbers(text, lang = 'ru') {
  if (lang !== 'ru') {
    return '';
  }

  let entryMaxLength = 0;

  const countMaxLength = (line, regexp) => {
    line = line.trim();
    regexp.lastIndex = 0;
    let matches = line.match(regexp);
    if (matches) {
      let entry = matches[1].trim();
      if (entry.length > entryMaxLength) {
        entryMaxLength = entry.length;
      }
    }
  };

  text = text.replace(/([А-ЯЁа-яёA-Za-z])(\d)/g, "$1 $2");
  let textArray = text.split(/\n+/);

  textArray.forEach((line) => {
    padFormulas.forEach((formula) => { countMaxLength(line, formula); });
  });

  textArray = textArray.map((line) => {
    if (entryMaxLength > 0) {
      padFormulas.forEach((formula) => {
        formula.lastIndex = 0;
        const matches = line.match(formula);
        if (matches) {
          let repeatLength = entryMaxLength - matches[1].trim().length + minPadLength;
          if (repeatLength < 0) { repeatLength = 0; }

          line = line.replace(formula, '$1' + padSymbol.repeat(repeatLength) + '$2$3');
        }
      });
    }
    return line.trim();
  });

  return textArray.join('\n').trim();
};
