import { multireplace, re } from './regexpUtils';

const wordFormsOpeners = {
  '1': '(^|\\s|\\()(1) ',
  '*2-4': '(^|\\s|\\()(\\d+\\.\\d+|[234]|[23456789][234]) ',
  '*5-0,11-19': '(^|\\s|\\()(1\\d|[567890]|[23456789][567890]) ',
};

const wordFormsEndings = {
  'mWords': '(стакан|литр|зубчик)[амиов]*(\\)|\\s|$)',
  'fWords': '(чаш|столов[ыхеаяой]+ лож|чайн[ыхеаяой]+ лож|ст[\\. ]+лож|ч[\\. ]+лож)[каеи]+(\\)|\\s|$)',
};

const wordFormsReplacements = [
  [re(wordFormsOpeners['1'] + wordFormsEndings['mWords']), '$1$2 $3$4'],
  [re(wordFormsOpeners['*2-4'] + wordFormsEndings['mWords']), '$1$2 $3а$4'],
  [re(wordFormsOpeners['*5-0,11-19'] + wordFormsEndings['mWords']), '$1$2 $3ов$4'],

  [re(wordFormsOpeners['1'] + wordFormsEndings['fWords']), '$1$2 $3ка$4'],
  [re(wordFormsOpeners['*2-4'] + wordFormsEndings['fWords']), '$1$2 $3ки$4'],
  [re(wordFormsOpeners['*5-0,11-19'] + wordFormsEndings['fWords']), '$1$2 $3ек$4'],

  [/(столов|чайн)[ыхеаяой]+( ложка)/g, '$1ая$2'],
  [/(столов|чайн)[ыхеаяой]+( ложек| ложки)/g, '$1ых$2'],
  [/(\d+\.\d+ )(столов|чайн)[ыхеаяой]+( ложки)/g, '$1$2ой$3'],

  [/(\d)\.(\d)/g, '$1,$2'],
];

export function fixRecipeWordForms(text, lang = 'ru') {
  if (lang !== 'ru') {
    return '';
  }

	return multireplace(text, wordFormsReplacements);
}
