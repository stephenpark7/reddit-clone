import styles from './index.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.pageContainer}>
      <h1>Error 404</h1>
      <span>Page could not be found.</span>
    </div>
  );
};
