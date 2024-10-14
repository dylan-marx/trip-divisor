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
        <div className="this">{account.name}</div>
      ))}
    </>
  )
}

export default App
