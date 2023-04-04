import { forwardRef, useEffect } from 'react';
import { autoResize } from '../../utils';

import styles from './Textarea.module.scss';

export const Textarea = forwardRef(function Textarea(props, textareaRef) {
  const { value, group, placeholder = '', title = '', readonly = false, onPaste = null, onChange = () => null } = props;

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      autoResize(textareaRef.current);
    }
  });

  const groupClassName = (group === 'out' ? styles.textarea_out : '');

  return (
    <textarea className={`${styles.textarea} ${groupClassName}`}
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
