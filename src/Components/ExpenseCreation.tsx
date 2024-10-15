import { FC, useState } from "react";
import Account from "./Objects/Account";
import Expense from "./Objects/Expense";
import './Styling/ExpenseCreation.css'

interface ExpenseCreationProps {
    allAccounts: Account[];
    allExpenses: Expense[];
}

const ExpenseCreation : FC<ExpenseCreationProps> = ({allAccounts, allExpenses}) => {

    const [expenses, setExpenses] = useState<Expense[]>(allExpenses);

    const handlePayementChange = (expenseIndex: number, paymentIndex: number, newPaymentValue: number) => {
        const newExpenses = [...expenses];
        newExpenses[expenseIndex].payments[paymentIndex] = newPaymentValue;
        setExpenses(newExpenses);
    }

    return (
        <div className="expense-creation-container">
            {   
                
                allExpenses.map((expense, expenseIndex) => (
                    <div key={expenseIndex} className="expense">
                        <div>{expense.description}</div>
                        {
                            expense.payments.map((payment, paymentIndex) => (
                                <input 
                                    key={paymentIndex}
                                    type='text'
                                    value={payment}
                                    onChange={(event) => handlePayementChange(expenseIndex, paymentIndex, Number(event.target.value))}
                                />
                            ))
                        }
                        <div>Total: {expense.getTotal()}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default ExpenseCreation;