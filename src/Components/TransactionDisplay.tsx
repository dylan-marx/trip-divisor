import './Styling/TransactionsDisplay.css'

interface Transactions {
    from: string;
    to: string;
    amount: number;
}


const TransactionDisplay: React.FC<{ transactions: Transactions[] }> = ({ transactions }) => (
    <div className='transaction-container'>
      <h2>Bill</h2>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.from} owes {t.amount.toFixed(2)} to {t.to}
          </li>
        ))}
      </ul>
    </div>
  );

export default TransactionDisplay;