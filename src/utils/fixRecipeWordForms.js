export function fixRecipeWordForms(text, lang = 'ru') {
  if (lang !== 'ru') {
    return '';
  }

  const buildRegexp = (re) => {
    return new RegExp(re, 'gi'); 
  };
  const regexpOpeners = {
    '_1': '(^|\\s|\\()(1) ',
    '_234': '(^|\\s|\\()(\\d+\\.\\d+|[234]|[23456789][234]) ',
    '_567890': '(^|\\s|\\()(1\\d|[567890]|[23456789][567890]) '
  };
  const regexpEndings = {
    'mWords': '(стакан|литр|зубчик)[амиов]*(\\)|\\s|$)',
    'fWords': '(чаш|столов[ыхеаяой]+ лож|чайн[ыхеаяой]+ лож|ст[\\. ]+лож|ч[\\. ]+лож)[каеи]+(\\)|\\s|$)'
  };

  // TODO: здесь нужны тесты
	return text
		.replace(buildRegexp(regexpOpeners['_1'] + regexpEndings['mWords']), "$1$2 $3$4")
		.replace(buildRegexp(regexpOpeners['_234'] + regexpEndings['mWords']), "$1$2 $3а$4")
		.replace(buildRegexp(regexpOpeners['_567890'] + regexpEndings['mWords']), "$1$2 $3ов$4")

		.replace(buildRegexp(regexpOpeners['_1'] + regexpEndings['fWords']), "$1$2 $3ка$4")
		.replace(buildRegexp(regexpOpeners['_234'] + regexpEndings['fWords']), "$1$2 $3ки$4")
		.replace(buildRegexp(regexpOpeners['_567890'] + regexpEndings['fWords']), "$1$2 $3ек$4")

		.replace(/(столов|чайн)[ыхеаяой]+( ложка)/g, "$1ая$2")
		.replace(/(столов|чайн)[ыхеаяой]+( ложек| ложки)/g, "$1ых$2")
		.replace(/(\d+\.\d+ )(столов|чайн)[ыхеаяой]+( ложки)/g, "$1$2ой$3")
		.replace(/(\d)\.(\d)/g, "$1,$2");
}
