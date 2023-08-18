import styles from './index.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.pageContainer}>
      <h2>Error 404</h2>
      <p>Page could not be found.</p>
    </div>
  );
};
