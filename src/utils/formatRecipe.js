export function formatRecipe(text, lang = 'ru') {
  if (lang !== 'ru') {
    return '';
  }

  let entryMaxLength = 0;
  const formulas = [
    /^([^\d]{4,})\s+(\d[\d\/\.\,\-]*)([^\d]+)$/,
    /^([^\d]{4,})\s+(по )(вкусу)$/
  ];

  const countMaxLength = (line, regexp) => {
    line = line.trim();
    let matches = line.match(regexp);
    if (matches) {
      let entry = matches[1].trim();
      if (entry.length > entryMaxLength) {
        entryMaxLength = entry.length;
      }
    }
  };

  text = text.replace(/([А-ЯЁа-яёA-Za-z])(\d)/g, "$1 $2");
  text = text.split(/\n+/);

  text.forEach((line) => {
    formulas.forEach((formula) => { countMaxLength(line, formula); });
  });

  if (entryMaxLength > 0) {
    text = text.map((line) => {
      formulas.forEach((formula) => { 
        const matches = line.match(formula);
        if (matches) {
          let repeatLength = entryMaxLength - matches[1].trim().length + 2;
          if (repeatLength < 0) { repeatLength = 0; }

          line = line.replace(formula, "$1" + ".".repeat(repeatLength) + "$2$3");
        }
      });
      return line;
    });
  }
  return text.join('\n');
};
