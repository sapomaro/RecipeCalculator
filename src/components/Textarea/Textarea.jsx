import { forwardRef, useEffect } from 'react';
import { autoResize } from '../../utils';

import './Textarea.scss';

export const Textarea = forwardRef(function Textarea(props, textareaRef) {
  const { value, placeholder = '', readonly = false, onPaste = null, onChange = () => null } = props;

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      autoResize(textareaRef.current);
    }
  });

  return (
    <textarea className="recipe-calculator__textarea" 
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onPaste={onPaste}
      onChange={onChange}
      readOnly={readonly}
    ></textarea>
  );
});
