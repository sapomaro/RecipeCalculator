import { useStoreElementState } from '../store';

export function Note({ name, group }) {
  const state = useStoreElementState({ name, group });

  return (
    <p>{state.value}</p>
  );
};
