import { forwardRef, useEffect } from 'react';
import { autoResize } from '../../utils';

import './Textarea.scss';

export const Textarea = forwardRef(function Textarea(props, textareaRef) {
  const { value, placeholder, readonly = false, onPaste = null, onChange = null } = props;

  useEffect(() => {
		if (textareaRef && textareaRef.current) {
      autoResize(textareaRef.current);
    }
	});

  return (
    <div className="recipe-calculator__textarea">
      <div className="recipe-calculator__textarea__placeholder">
        {value === '' ? placeholder : ''}
      </div>
      <textarea className="recipe-calculator__textarea__input" 
        ref={textareaRef}
        value={value}
        onPaste={onPaste}
        onChange={onChange}
        readOnly={readonly}
      ></textarea>
    </div>
  );
});
