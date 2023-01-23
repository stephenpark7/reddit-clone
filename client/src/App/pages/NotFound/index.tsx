import styles from '../../styles/Home.module.css';

export default function NotFound() {
  return (
    <div className={styles.pageContainer}>
      <h1>Error 404</h1>
      <span>Page could not be found.</span>
    </div>
  );
}
