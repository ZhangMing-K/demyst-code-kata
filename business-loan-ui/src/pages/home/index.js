import { useEffect, useState } from "react";
import BusinessDetail from "../../components/businessDetail";
import styles from "../../styles/home.module.css";
import BalanceSheet from "../../components/balanceSheet";
import Outcome from "../../components/outcome";
import service from "../../services";

const STEP = {
  INIT: "Initialize",
  DETAIL: "BusinessDetail",
  SHEET: "BalanceSheet",
  OUTCOME: "Outcome",
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Home() {
  const [step, setStep] = useState(STEP.INIT);
  const [sheet, setSheet] = useState([]);
  const [businessDetails, setBusinessDetails] = useState({});
  const [finalOutcome, setFinalOutcome] = useState({});
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    async function initializeApplication() {
      if (!hasInitialized) {
        // Wait for 1 second just to simulate initializing
        await delay(1000);
        await service.initiate();
        setHasInitialized(true);
        setStep(STEP.DETAIL);
      }
    }
    initializeApplication();
  }, []);

  const onSubmitDetail = (details, sheet) => {
    setSheet(sheet);
    setBusinessDetails(details);
    setStep(STEP.SHEET);
  };

  const onBack = () => {
    setSheet([]);
    setBusinessDetails({});
    setStep(STEP.DETAIL);
  };

  const onSubmitApplication = (outcome) => {
    setFinalOutcome(outcome);
    setStep(STEP.OUTCOME);
  };

  const onDone = () => {
    setStep(STEP.DETAIL);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Get a Business Loan</h1>
        {step === STEP.INIT ? (
          <div>Initializing</div>
        ) : step === STEP.DETAIL ? (
          <BusinessDetail onSubmit={onSubmitDetail} />
        ) : step === STEP.SHEET ? (
          <BalanceSheet
            details={businessDetails}
            sheet={sheet}
            onBack={onBack}
            onSubmit={onSubmitApplication}
          />
        ) : (
          <Outcome outcome={finalOutcome} onDone={onDone} />
        )}
      </main>
    </div>
  );
}
