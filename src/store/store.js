import { createContext, useContext, useReducer } from 'react';

import { reducer } from './reducer';
import { storeElementsInitialState } from './initialState';

const StoreElementsStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

export function StoreProvider({ children }) {
  const [storeElementsCurrentState, dispatch] = useReducer(reducer, storeElementsInitialState);

  return (
    <StoreElementsStateContext.Provider value={storeElementsCurrentState}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreElementsStateContext.Provider>
  );
}

export function useStoreElementState({ name, group }) {
  const storeElementsCurrentState = useContext(StoreElementsStateContext);

  return storeElementsCurrentState.find((element) => {
    return element.name === name && element.group === group;
  });
}

export function useStoreDispatch() {
  return useContext(StoreDispatchContext);
}
