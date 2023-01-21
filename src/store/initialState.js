const radioFieldDefaultSettings = {
	type: 'radiofield',
	value: '',
	active: false,
	checked: false,
	disabled: false,
};

export const initialState = {
	aggregateData: {
		inputVolume: 0,
		inputShape: '',
		inputRecipe: '',

		outputVolume: 0,
		outputShape: '',
		outputRecipe: '',
	},

	elements: [
		{ name: 'servings', group: 'in', category: 'volume', ...radioFieldDefaultSettings,
			active: true, checked: true, value: '1' },
		{ name: 'round_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },
		{ name: 'rect_pan', group: 'in', category: 'pans', ...radioFieldDefaultSettings },

		{ name: 'ingredients', group: 'in', type: 'textarea', value: 'INGREDIENTS INPUT TEST' },

		{ name: 'servings', group: 'out', category: 'volume', ...radioFieldDefaultSettings },
		{ name: 'round_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },
		{ name: 'rect_pan', group: 'out', category: 'pans', ...radioFieldDefaultSettings, disabled: true },

		{ name: 'ingredients', group: 'out', type: 'textarea', value: 'INGREDIENTS OUTPUT TEST' },

		{ name: 'summary', group: 'out', type: 'note', value: 'NOTE TEST' },
	],
};
