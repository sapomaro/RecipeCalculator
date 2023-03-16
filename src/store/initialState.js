const radioFieldDefaultSettings = {
	type: 'radiofield',
	value: '',
	active: false,
	checked: false,
	valid: true,
	disabled: false,
};

export const initialState = {
	aggregateData: {
		inputSize: '',
		inputVolume: 0,
		inputShape: '',
		inputRecipe: '',

		multiplier: 0,

		outputSize: '',
		outputVolume: 0,
		outputShape: '',
		outputRecipe: '',
	},

	elements: [
		{ name: 'servings', group: 'in', category: 'volume', ...radioFieldDefaultSettings,
			active: true, checked: true, value: '1' },
		{ name: 'round_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },
		{ name: 'rect_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },

		{ name: 'ingredients', group: 'in', type: 'textarea', value: '' },

		{ name: 'servings', group: 'out', category: 'volume', ...radioFieldDefaultSettings,
			checked: true, value: '2' },
		{ name: 'round_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },
		{ name: 'rect_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },

		{ name: 'ingredients', group: 'out', type: 'textarea', value: '' },

		{ name: 'summary', group: 'out', type: 'note', value: '' },

		{ name: 'clear', group: 'in', type: 'button', value: '' }
	],
};
