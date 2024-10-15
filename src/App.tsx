import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"

function App() {

  class Account {
    name: string;
    owedAmount: number[];

    constructor(name: string, owedAmount: number[]) {
      this.name = name;
      this.owedAmount = owedAmount;
    }
  }

  class Expense {
    payments: number[];


    constructor(payments: number[]) {
      this.payments = payments;
    }

    public getTotal = () => {
      let total:number = 0;
      for (let payment of this.payments) {
        total = total + payment;
      }

      return total;
    }

    public getFairShare = () => {
      const total = this.getTotal();
      const n = this.payments.length;

      return total/n;
    }

    public getOwed = () => {
      const owed: number[] = [];
      const fairShare: number = this.getFairShare();

      for (let i = 0; i < this.payments.length; i++) {
        const delta = fairShare - this.payments[i];
        owed.push(delta);
      }

      return owed;
    }
  }

  const [names, setNames] = useState<string[]>([]);
  const [allAccounts, setAccounts] = useState<Account[]>([]);

  // Updates the names
  const handleUpdateNames = (newNames: string[]) => {
    setNames([...newNames]);
  }

  // Create new Account objects for all names
  useEffect(() => {
    let newAccounts: Account[] = [];

    for (let i = 0; i < names.length; i++){
      const newAccount = new Account(names[i], []);
      newAccounts.push(newAccount);
    }
    
    setAccounts(newAccounts);
  }, [names]);

  return (
    <>
      <AccountCreation updateNames={handleUpdateNames}/>

      {allAccounts.map((account, index) => (
        <div className="this">
          {account.name}
          <div>{account.owedAmount}</div>
        </div>
      ))}
    </>
  )
}

export default App
