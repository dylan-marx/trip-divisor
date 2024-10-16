import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"
import ExpenseCreation from "./Components/ExpenseCreation";
import Account from "./Components/Objects/Account";
import Expense from "./Components/Objects/Expense";

function App() {

  const [names, setNames] = useState<string[]>([]);
  const [allAccounts, setAccounts] = useState<Account[]>([]);
  const [allExpenses, setExpenses] = useState<Expense[]>([]);
  const [owed, setOwed] = useState<number[]>([]);

  // Updates the names
  const handleUpdateNames = (newNames: string[]) => {

    // if a name gets deleted
    if (newNames.length < names.length) {

      // get the name that was deleted
      const missingName = names.filter((name) => !newNames.includes(name))[0];
      const indexOfMissingName = names.indexOf(missingName);

      let updatedExpenses = allExpenses.map((expense) => {
        const newPayments = [...expense.payments];
        newPayments.splice(indexOfMissingName, 1);

        return new Expense(newPayments, expense.description);
      });

      setExpenses(updatedExpenses);
    }


    setNames([...newNames]);
  }

  // Create new Account objects for all names
  useEffect(() => {
    let newAccounts: Account[] = names.map(name => new Account(name, []));

    let updatedExpenses = allExpenses.map((expense) => {
      let newPayments = Array(newAccounts.length).fill(0);
      for (let i = 0; i <  Math.min(expense.payments.length, newAccounts.length); i++) {
        newPayments[i] = expense.payments[i];
      }

      return new Expense(newPayments, expense.description);
    });

    setExpenses(updatedExpenses);
    setAccounts(newAccounts);
  }, [names]);

  const handleUpdateExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
  }

  const calculateOwed = () => {
    let total = Array(allExpenses[0].payments.length).fill(0);

    for (let expens of allExpenses) {
      const fairShare = expens.getFairShare();

      for (let i = 0; i < expens.payments.length; i++) {
        // calculate if the person is owed or owes money
        total[i] = total[i] + (fairShare - expens.payments[i]);
      }
    }

    return total;
  }

  useEffect(() => {
    if (allExpenses.length >= 1) {
      setOwed(calculateOwed);
    }
  }, [allExpenses])

  return (
    <div className='app-container'>
      <AccountCreation updateNames={handleUpdateNames}/>
      <ExpenseCreation allAccounts={allAccounts} allExpenses={allExpenses} updateExpenses={handleUpdateExpenses}/>
      {
        owed.map((entry, index) => (
          <div>
            {entry}
          </div>
        ))
      }
    </div>
  )
}

export default App;