export function reducer(state, actionElement) {
	switch (actionElement.action) {
		case 'CHECKED':
			return {
        ...state,
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.group === actionElement.group) {
              if (storeElement.name === actionElement.name) {
                return { ...storeElement, checked: true, active: true };
              } else {
                return { ...storeElement, checked: false, active: false };
              }
            } else if (storeElement.group === 'out') {
              if (storeElement.category === actionElement.category) {
                return { ...storeElement, disabled: false };
              } else {
                return { ...storeElement, checked: false, disabled: true };
              }
            }
          }
          return storeElement;
        }),
      };

		case 'BLURRED':
			return {
        ...state,
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
              return { ...storeElement, active: false };
            }
          }
          return storeElement;
        }),
      };

		case 'TYPED':
			return {
        ...state,
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
              return { ...storeElement, value: actionElement.value };
            }
          }
          return storeElement;
        }),
      };

		case 'RENDERED':
      return state;

		default:
			return state;
	}
};
