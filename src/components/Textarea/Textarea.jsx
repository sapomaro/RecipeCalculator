import { forwardRef, useEffect } from 'react';
import { autoResize } from '../../utils';

import './Textarea.scss';

export const Textarea = forwardRef(function Textarea(props, textareaRef) {
  const { value, group, placeholder = '', title = '', readonly = false, onPaste = null, onChange = () => null } = props;

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      autoResize(textareaRef.current);
    }
  });

  return (
    <textarea className={`recipe-calculator__textarea recipe-calculator__textarea_${group}`}
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      title={title}
      onPaste={onPaste}
      onChange={onChange}
      readOnly={readonly}
    ></textarea>
  );
});
