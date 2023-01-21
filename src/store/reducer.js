import { aggregateDataReducer } from './aggregateDataReducer';

export function reducer(state, actionElement) {
  let updatedData = {};

	switch (actionElement.action) {
		case 'CHECKED':
			return {
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.group === actionElement.group) {
              if (storeElement.name === actionElement.name) {
                updatedData = { ...updatedData, ...aggregateDataReducer(state.aggregateData, storeElement) };
 
                return { ...storeElement, checked: true, active: true };
              } else {
                return { ...storeElement, checked: false, active: false };
              }
            } else if (storeElement.group === 'out') {
              if (storeElement.checked) {
                updatedData = { ...updatedData, ...aggregateDataReducer(state.aggregateData, storeElement) };
              }

              if (storeElement.category === actionElement.category) {
                return { ...storeElement, disabled: false };
              } else {
                return { ...storeElement, checked: false, disabled: true };
              }
            }
          }
          return storeElement;
        }),
        aggregateData: updatedData,
      };

		case 'BLURRED':
			return {
        ...state,
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
              return { ...storeElement, active: false, value: actionElement.value };
            }
          }
          return storeElement;
        }),
      };

		case 'TYPED':
			return {
        elements: state.elements.map((storeElement) => {
          if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
            const updatedElement = { ...storeElement, value: actionElement.value };
            updatedData = aggregateDataReducer(state.aggregateData, updatedElement);
            return updatedElement;
          }
          return storeElement;
        }),
        aggregateData: updatedData,
      };

		case 'RENDERED':
      return state;

		default:
			return state;
	}
};
