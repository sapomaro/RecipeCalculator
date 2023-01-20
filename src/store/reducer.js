export function reducer(state, action) {
  switch (action.action) {
		case 'TEST':
      return state.map((element) => {
        if (element.type === 'radio') {
          element.checked = !element.checked;
        }
        return element;
      });
  }
};
