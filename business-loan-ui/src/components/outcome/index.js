import styles from "../../styles/detail.module.css";

export default function Outcome({ outcome = {}, onDone }) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.rowItem}>
          <label>Result: {outcome.result} </label>
        </div>
        <div className={styles.rowItem}>
          <label>Amount: {outcome.amount} </label>
        </div>
        <div className={styles.rowItem}>
          <label>Interest rate: {outcome.interestRate} </label>
        </div>
        <div className={styles.rowItem}>
          <label>Term: {outcome.term}</label>
        </div>

        <button onClick={onDone} className={styles.button}>
          Done
        </button>
      </div>
    </div>
  );
}
