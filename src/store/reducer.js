import { aggregateDataReducer } from './aggregateDataReducer';
import { elementValidationReducer } from './elementValidationReducer';

function updateStoreElements(state, callback) {
  let updatedAggregateData = state.aggregateData;

  return {
    elements: state.elements.map((storeElement) => {
      storeElement = callback(storeElement);
      storeElement.valid = elementValidationReducer(storeElement);
      updatedAggregateData = aggregateDataReducer(updatedAggregateData, storeElement);
      return storeElement;
    }),
    aggregateData: updatedAggregateData,
  };
}

export function reducer(state, actionElement) {
	switch (actionElement.action) {
		case 'CHECKED':
			return updateStoreElements(state, (storeElement) => {
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
      });

		case 'BLURRED':
			return updateStoreElements(state, (storeElement) => {
        if (storeElement.type === 'radiofield' &&
            storeElement.name === actionElement.name &&
            storeElement.group === actionElement.group) {
          return { ...storeElement, active: false, value: actionElement.value };
        }
        return storeElement;
      });

		case 'TYPED':
			return updateStoreElements(state, (storeElement) => {
        if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
          return { ...storeElement, value: actionElement.value };
        }
        return storeElement;
      });

    case 'CLEAR':
      return updateStoreElements(state, (storeElement) => {
        if (storeElement.type === 'textarea' && storeElement.group === 'in') {
          return { ...storeElement, value: '' };
        }
        return storeElement;
      });

		case 'INIT':
      return updateStoreElements(state, (storeElement) => storeElement);

		default:
			return state;
	}
};
