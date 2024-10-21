import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"
import ExpenseCreation from "./Components/ExpenseCreation";
import Account from "./Components/Objects/Account";
import Expense from "./Components/Objects/Expense";
import TransactionDisplay from "./Components/TransactionDisplay";

interface Person {
  index: number;
  amount: number;
}

interface Transactions {
  from: string;
  to: string;
  amount: number;
}

function App() {

  const [names, setNames] = useState<string[]>([]);
  const [allAccounts, setAccounts] = useState<Account[]>([]);
  const [allExpenses, setExpenses] = useState<Expense[]>([]);
  const [owed, setOwed] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);


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
    let total = Array(allExpenses[0]?.payments.length || 0).fill(0);

    for (let expens of allExpenses) {
      const fairShare = expens.getFairShare();

      for (let i = 0; i < expens.payments.length; i++) {
        // calculate if the person is owed or owes money
        total[i] = total[i] + (fairShare - expens.payments[i]);
      }
    }

    return total;
  }

  const settleDebts = () => {
    let debtors: Person[] = [];
    let creditors: Person[] = [];
    
    // splits into those that owe money and those that are owed
    owed.forEach((balance, index) => {
      if (balance > 0) {
        debtors.push({index, amount: balance});
      } else if (balance < 0) {
        creditors.push({index, amount: -balance});
      }
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    let transactions: Transactions[] = [];
    let i = 0, j = 0;

    // divides money until a person has paid off their debt then moves to next
    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];
      let amount = Math.min(debtor.amount, creditor.amount);

      transactions.push({
        from: allAccounts[debtor.index].name,
        to: allAccounts[creditor.index].name,
        amount: amount
      });

      debtor.amount = parseFloat((debtor.amount - amount).toFixed(2));
      creditor.amount = parseFloat((creditor.amount - amount).toFixed(2));

      if (Math.abs(debtor.amount) < 0.01) i++;
      if (Math.abs(creditor.amount) < 0.01) j++;
    }

    return transactions;
  }

  useEffect(() => {
    if (allExpenses.length >= 1) {
      const newOwed = calculateOwed();
      setOwed(newOwed);
    } else {
      setOwed([]);
    }
  }, [allExpenses]);

  useEffect(() => {
    if (owed.length > 0) {
      const newTransactions = settleDebts();
      setTransactions(newTransactions);
    } else {
      setTransactions([]);
    }
  }, [owed]);

  return (
    <div className='app-container'>
      <AccountCreation updateNames={handleUpdateNames}/>
      <ExpenseCreation allAccounts={allAccounts} allExpenses={allExpenses} updateExpenses={handleUpdateExpenses}/>
      <TransactionDisplay transactions={transactions} />
    </div>
  )
}

export default App;