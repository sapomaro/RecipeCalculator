import { createContext, useContext, useReducer } from 'react';

import { reducer } from './reducer';
import { initialState } from './initialState';

const StoreElementsStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

export function StoreProvider({ children }) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreElementsStateContext.Provider value={currentState}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreElementsStateContext.Provider>
  );
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
