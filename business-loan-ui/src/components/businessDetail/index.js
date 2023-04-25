import styles from "../../styles/detail.module.css";
import { useEffect, useState } from "react";
import service from "../../services";

export default function BusinessDetail({ onSubmit }) {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    yearEstablished: "",
    loanAmount: 1000,
    accountingProvider: "",
  });

  useEffect(() => {
    async function fetchProvidersList() {
      const result = await service.fetchProvidersList();
      if (!result) return;
      const { success, providers } = result;
      if (success) {
        setForm({
          ...form,
          accountingProvider: providers[0].name,
        });
        setProviders(providers);
      }
    }
    fetchProvidersList();
  }, []);

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  async function fetchBalanceSheet() {
    const result = await service.fetchBalanceSheet();
    if (!result) return [];
    const { success, sheet } = result;
    if (success) {
      return sheet;
    }
    return [];
  }

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const sheet = await fetchBalanceSheet();
    onSubmit(form, sheet);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <div className={styles.rowItem}>
            <label htmlFor="businessName">Business Name: </label>
            <input type="text" id="businessName" onChange={updateForm} />
          </div>
          <div className={styles.rowItem}>
            <label htmlFor="businessAddress">Business Address: </label>
            <input type="text" id="businessAddress" onChange={updateForm} />
          </div>
          <div className={styles.rowItem}>
            <label htmlFor="businessEmail">Business Email: </label>
            <input type="email" id="businessEmail" onChange={updateForm} />
          </div>
          <div className={styles.rowItem}>
            <label htmlFor="yearEstablished">Year Established</label>
            <input type="date" id="yearEstablished" onChange={updateForm} />
          </div>
          <div className={styles.rowItem}>
            <label htmlFor="loanAmount">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              min={100}
              onChange={updateForm}
            />
          </div>
          <div className={styles.rowItem}>
            <label htmlFor="accountingProvider">Account Provider</label>
            <select id="accountingProvider" onChange={updateForm}>
              {providers.map((provider, index) => (
                <option
                  value={provider.name}
                  key={"provider" + index.toString()}
                >
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Request balance sheet
          </button>
        </div>
      </form>
    </div>
  );
}
