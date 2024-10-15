import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"
import ExpenseCreation from "./Components/ExpenseCreation";
import Account from "./Components/Objects/Account";
import Expense from "./Components/Objects/Expense";

function App() {

  const [names, setNames] = useState<string[]>([]);
  const [allAccounts, setAccounts] = useState<Account[]>([]);
  const [allExpenses, setExpenses] = useState<Expense[]>([]);
  
  // TODO REMOVE
  useEffect(() => {
    let expense = new Expense([2, 3, 10], 'food');
    let newExpenses : Expense[] = [];
    newExpenses.push(expense);

    expense = new Expense([13, 0, 6], 'food');
    newExpenses.push(expense);
    setExpenses(newExpenses);
  }, []);

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
    <div className='app-container'>
      <AccountCreation updateNames={handleUpdateNames}/>
      <ExpenseCreation allAccounts={allAccounts} allExpenses={allExpenses}/>
    </div>
  )
}

export default App;