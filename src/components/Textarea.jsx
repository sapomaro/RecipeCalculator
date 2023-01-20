import { useStoreDispatch, useStoreElementState } from '../store';

export function Textarea({ name, group }) {
  const state = useStoreElementState({ name, group });
  const dispatch = useStoreDispatch();

  return (
    <textarea defaultValue={state.value}></textarea>
  );
};
