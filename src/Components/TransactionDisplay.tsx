interface Transactions {
    from: string;
    to: string;
    amount: number;
  }

const TransactionDisplay: React.FC<{ transactions: Transactions[] }> = ({ transactions }) => (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.from} owes ${t.amount} to {t.to}
          </li>
        ))}
      </ul>
    </div>
  );

export default TransactionDisplay;