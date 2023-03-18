import { Button } from './Button';
import { useStoreDispatch } from '../../store';

export function PasteButton({ name, group }) {
  const dispatch = useStoreDispatch();
  const clipboardReadEnabled = (navigator.clipboard && typeof navigator.clipboard.readText === 'function');

  const handleClick = () => {
    if (clipboardReadEnabled) {
      navigator.clipboard.readText().then((clipText) => {
        dispatch({ action: 'PASTE', name, group, value: clipText });
      }).catch((clipError) => {
        console.warn(clipError);
      });
    }
  };

  return (
    <>
      {clipboardReadEnabled ? <Button label='🗇 Вставить' onClick={handleClick} /> : <span></span> }
    </>
  );
};
