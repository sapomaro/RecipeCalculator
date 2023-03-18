import { aggregateDataReducer } from './aggregateDataReducer';
import { elementValidationReducer } from './elementValidationReducer';

function updateStoreElements(state, callback) {
  let updatedAggregateData = state.aggregateData;

  return {
    elements: state.elements.map((storeElement) => {
      const updatedStoreElement = callback(storeElement);
      if (updatedStoreElement !== storeElement) {
        updatedStoreElement.valid = elementValidationReducer(updatedStoreElement);
      }
      updatedAggregateData = aggregateDataReducer(updatedAggregateData, updatedStoreElement);
      return updatedStoreElement;
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
        if (storeElement.group === actionElement.group) {
          if (storeElement.name === actionElement.name) {
            return { ...storeElement, value: actionElement.value };
          }
          if (storeElement.name === 'clear') {
            return { ...storeElement, value: 'clear' };
          }
        }
        return storeElement;
      });

    case 'CLEAR':
      let previousValue = '';
      return updateStoreElements(state, (storeElement) => {
        if (storeElement.group === 'in') {
          if (storeElement.type === 'textarea') {
            previousValue = storeElement.value;
            return { ...storeElement, value: '', previousValue };
          }
          if (storeElement.name === 'clear' && previousValue !== '') {
            return { ...storeElement, value: 'restore' };
          }
        }
        return storeElement;
      });

    case 'RESTORE':
      return updateStoreElements(state, (storeElement) => {
        if (storeElement.group === 'in') {
          if (storeElement.type === 'textarea' && storeElement.previousValue) {
            return { ...storeElement, value: storeElement.previousValue, previousValue: '' };
          }
          if (storeElement.name === 'clear') {
            return { ...storeElement, value: 'clear' };
          }
        }
        return storeElement;
      });

    case 'PASTE':
      return updateStoreElements(state, (storeElement) => {
        if (storeElement.group === 'in') {
          if (storeElement.type === 'textarea') {
            return { ...storeElement, value: actionElement.value };
          }
          if (storeElement.name === 'clear') {
            return { ...storeElement, value: 'clear' };
          }
        }
        return storeElement;
      });

		case 'INIT':
      return updateStoreElements(state, (storeElement) => storeElement);

		default:
			return state;
	}
};
