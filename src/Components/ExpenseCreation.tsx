import { ChangeEvent, FC, useEffect, useState } from "react";
import Account from "./Objects/Account";
import Expense from "./Objects/Expense";
import './Styling/ExpenseCreation.css'

interface ExpenseCreationProps {
    allAccounts: Account[];
    allExpenses: Expense[];
    updateExpenses : (newExpenses: Expense[]) => void;
}

const ExpenseCreation : FC<ExpenseCreationProps> = ({allAccounts, allExpenses,  updateExpenses }) => {
    const [description, setDescription] = useState('');
    const [addingExpense, setAddingExpense] = useState(false);
    const [expenses, setExpenses] = useState<Expense[]>(allExpenses);
    
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        updateExpenses (expenses);
    }, [expenses]);

    const handlePayementChange = (expenseIndex: number, paymentIndex: number, newPaymentValue: number) => {
        const newExpenses = [...expenses];
        newExpenses[expenseIndex].payments[paymentIndex] = newPaymentValue;
        setExpenses(newExpenses);
    }

    const handleInputChange  = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const addExpense = () => {
        if (allAccounts.length !== 0) {
            if (description.trim() !== '') {
                const newPayments = new Array(allAccounts.length).fill(0);
                const newExpense = new Expense(newPayments, description);
                const newExpenses = [...expenses];
                newExpenses.push(newExpense);
        
                setExpenses(newExpenses);
                setDescription('');
                setAddingExpense(false);
                setError('');
                setShowError(false);
            } else {
                setError('Please add a description');
                setShowError(true);
            }
        } else {
            setError('Please add the people who went on the trip');
            setShowError(true);
        }
    }

    return (
        <div className="expense-creation-container">
            <div>
                <div>What expenses did you have?</div>
                {
                    (!addingExpense) && <button onClick={() => setAddingExpense(true)}>Add Expense</button>
                }
                {
                    (showError) && <div>
                        <div>{error}</div>
                    </div>
                }
                {
                    addingExpense && (
                        <div>
                            <input type="text" value={description} onChange={handleInputChange}></input>
                            <button onClick={addExpense}>Add</button>
                            <button onClick={() => setAddingExpense(false)}>Cancel</button>
                        </div>
                    )
                }
                
            </div>
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