import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"
import ExpenseCreation from "./Components/ExpenseCreation";
import Account from "./Components/Objects/Account";
import Expense from "./Components/Objects/Expense";

function App() {

  const [names, setNames] = useState<string[]>([]);
  const [allAccounts, setAccounts] = useState<Account[]>([]);
  const [allExpenses, setExpenses] = useState<Expense[]>([]);
  

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

    // Adjust expense payement length to account for new Accounts added
    let updatedExpeses = allExpenses.map((expense) => {
      let newPayments = Array(newAccounts.length).fill(0);

      for (let i = 0; i < expense.payments.length; i++) {
        newPayments[i] = expense.payments[i];
      }
    
      return {...expense, payments: newPayments};
    })

    setExpenses(updatedExpeses);
    setAccounts(newAccounts);
  }, [names]);

  const handleUpdateExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
  }

  return (
    <div className='app-container'>
      <AccountCreation updateNames={handleUpdateNames}/>
      <ExpenseCreation allAccounts={allAccounts} allExpenses={allExpenses} updateExpenses={handleUpdateExpenses}/>
    </div>
  )
}

export default App;