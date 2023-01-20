import { useStoreDispatch, useStoreElementState } from '../store';

export function RadioField({ name, group }) {
  const state = useStoreElementState({ name, group });
  const dispatch = useStoreDispatch();

  const clickHandler = () => {
    dispatch({
      action: 'TEST',
    });
  };

  return (
    <button onClick={clickHandler}>RadioField test {state.checked.toString()}</button>
  );
};
