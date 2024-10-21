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
    
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handlePayementChange = (expenseIndex: number, paymentIndex: number, newPaymentValue: number) => {
        const newExpense = allExpenses.map((expense, index) => {
            if (index === expenseIndex) {
                const newPayments = [...expense.payments];
                newPayments[paymentIndex] = newPaymentValue;
                return new Expense(newPayments, expense.description);
            }
            return expense;
        });

        updateExpenses(newExpense);
    }

    const handleInputChange  = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const addExpense = () => {
        if (allAccounts.length !== 0) {
            if (description.trim() !== '') {
                const newPayments = new Array(allAccounts.length).fill(0);
                const newExpense = new Expense(newPayments, description);
                const newExpenses = [...allExpenses, newExpense];
        
                updateExpenses(newExpenses);
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

    const handleDelete = (expenseIndex: number) => {
        const newExpenses = allExpenses.filter((_, index) => index !== expenseIndex);
        updateExpenses(newExpenses);
        setError('');
        setShowError(false);
    }

    return (
        <div className="expense-creation-container">
            <h2>Expenses</h2>
            <div className="expense-creation">
                <div>What expenses did you have?</div>
                {
                    (!addingExpense) && <button id="add-expense-button" className="primary-button" onClick={() => setAddingExpense(true)}>Add Expense</button>
                }
                {
                    (showError) && <div>
                        <div>{error}</div>
                    </div>
                }
                {
                    addingExpense && (
                        <div className="expense-creation-controls">
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
                        <div className="expense-content">
                            <div>
                                <div className="expense-description">{expense.description}</div>
                            </div>

                            <div className="expenses-input">
                                {
                                    expense.payments.map((payment, paymentIndex) => (
                                        <div key={paymentIndex}>
                                            <div className="expense-account-name">{allAccounts[paymentIndex].name}</div>
                                            <input 
                                                type='text'
                                                value={payment}
                                                onChange={(event) => handlePayementChange(expenseIndex, paymentIndex, Number(event.target.value))}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="md:w-1/3 text-right">
                                <div>Total: {expense.getTotal()}</div>
                            </div>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(expenseIndex)}>X</button>
                    </div>
                ))
            }
        </div>
    );
}

export default ExpenseCreation;