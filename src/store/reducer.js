import { aggregateDataReducer } from './aggregateDataReducer';
import { elementValidationReducer } from './elementValidationReducer';

export function reducer(state, actionElement) {
  let updatedAggregateData = state.aggregateData;

  const updateAggregateData = (storeElement) => {
    updatedAggregateData = aggregateDataReducer(updatedAggregateData, storeElement);
  };

	switch (actionElement.action) {
		case 'CHECKED':
			return {
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.group === actionElement.group) {
              if (storeElement.name === actionElement.name) {
                storeElement = { ...storeElement, checked: true, active: true };
              } else {
                storeElement = { ...storeElement, checked: false, active: false };
              }
            } else if (storeElement.group === 'out') {
              if (storeElement.category === actionElement.category) {
                storeElement = { ...storeElement, disabled: false };
              } else {
                storeElement = { ...storeElement, checked: false, disabled: true };
              }
            }
          }

          storeElement.valid = elementValidationReducer(storeElement);
          updateAggregateData(storeElement);

          return storeElement;
        }),
        aggregateData: updatedAggregateData,
      };

		case 'BLURRED':
			return {
        elements: state.elements.map((storeElement) => {
          if (storeElement.type === 'radiofield') {
            if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
              storeElement = { ...storeElement, active: false, value: actionElement.value };
              storeElement.valid = elementValidationReducer(storeElement);
            }
          }
          return storeElement;
        }),
        aggregateData: updatedAggregateData,
      };

		case 'TYPED':
			return {
        elements: state.elements.map((storeElement) => {
          if (storeElement.name === actionElement.name && storeElement.group === actionElement.group) {
            storeElement = { ...storeElement, value: actionElement.value };
            storeElement.valid = elementValidationReducer(storeElement);
          }
          updateAggregateData(storeElement);
          return storeElement;
        }),
        aggregateData: updatedAggregateData,
      };

		case 'INIT':
      state.elements.forEach((storeElement) => {
        updateAggregateData(storeElement);
      });
      return {
        elements: state.elements,
        aggregateData: updatedAggregateData,
      };

		default:
			return state;
	}
};
