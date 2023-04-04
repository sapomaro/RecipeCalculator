import styles from './Button.module.scss';

export function Button({ label, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>{label}</button>
  );
};
