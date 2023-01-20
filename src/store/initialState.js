const radioFieldDefaultSettings = {
	type: 'radio',
	value: '', 
	checked: false, 
	valid: true, 
	disabled: false,
};

export const storeElementsInitialState = [
  { name: 'servings', group: 'in', category: 'volume', ...radioFieldDefaultSettings, checked: true },
  { name: 'round_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },
  { name: 'rect_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },

	{ name: 'ingredients', group: 'in', type: 'textarea', value: 'INGREDIENTS INPUT TEST' },

  { name: 'servings', group: 'out', category: 'volume', ...radioFieldDefaultSettings },
  { name: 'round_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },
  { name: 'rect_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },

	{ name: 'ingredients', group: 'out', type: 'textarea', value: 'INGREDIENTS OUTPUT TEST' },

	{ name: 'summary', group: 'out', type: 'note', value: 'NOTE TEST' },
];
