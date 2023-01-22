import { useEffect, useRef } from 'react';
import { autoResize } from '../../utils';

import './Textarea.scss';

export function Textarea(props) {
	const textareaRef = useRef(null);

  const { value, placeholder, readonly = false, onPaste = null, onChange = null } = props;

  useEffect(() => {
		if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
	});

  return (
    <div className="textarea__wrapper">
      <div className="textarea__placeholder">
        {value === '' ? placeholder : ''}
      </div>
      <textarea className="textarea__input" 
        ref={textareaRef}
        value={value}
        onPaste={onPaste}
        onChange={onChange}
        readOnly={readonly}
      ></textarea>
    </div>
  );
};
