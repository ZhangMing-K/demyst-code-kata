import styles from "../../styles/detail.module.css";
import service from "../../services";

export default function BalanceSheet({ details, sheet, onBack, onSubmit }) {
  const handleSubmit = async (e) => {
    const outcomeResult = await service.requestOutcome(details);
    if (!outcomeResult) return;
    const { success, outcome } = outcomeResult;
    if (!success) return;
    onSubmit(outcome);
  };
  return (
    <div className={styles.container}>
      <div className={styles.description}>Balance sheet</div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Profit or Loss</th>
              <th>Assets</th>
            </tr>
          </thead>
          <tbody>
            {sheet?.map((row, index) => (
              <tr key={index.toString()}>
                <td>{row.year}</td>
                <td>{monthToName(row.month)}</td>
                <td>${row.profitOrLoss}.00</td>
                <td>${row.assetsValue}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onBack} className={styles.button}>
          Back
        </button>
      </div>
    </div>
  );
}

function monthToName(month) {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Unknown";
  }
}
