import { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';

const LOCAL_STORAGE_KEY = 'recipeCalculatorState';

const StoreElementsStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

export function clearStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function stateInitializer(initialValue = initialState) {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialValue;
  } catch (error) {
    console.warn(error);
    return initialValue;
  }
}

export function StoreProvider({ children }) {
  const [currentState, dispatch] = useReducer(reducer, initialState, stateInitializer);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
    } catch (error) {
      console.warn(error);
    }
  }, [currentState]);

  return (
    <StoreElementsStateContext.Provider value={currentState}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreElementsStateContext.Provider>
  );
}

export function aggregateDataSelector(state) {
  return state.aggregateData;
}

export function elementSelector({ name, group }) {
  return (state) => {
    return state.elements.find((element) => {
      return element.name === name && element.group === group;
    });
  };
}

export function useStoreSelector(selector) {
  const currentState = useContext(StoreElementsStateContext);
  return selector(currentState);
}

export function useStoreDispatch() {
  return useContext(StoreDispatchContext);
}
