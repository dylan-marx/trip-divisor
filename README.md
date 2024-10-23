# Trip Divisor

A webpage that allows users to split the cost of road trip evenly between them using the fewest possible transactions.

## Setup

1. Clone the repository using the command: `git clone https://github.com/dylan-marx/trip-divisor.git`.
2. Navigate to the cloned directory.
3. Install the required dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Open your browser and navigate to the specified address.

## Approach

First the amount each person paid for all expenses is added up. Then determine who owes money
and who is owed, along the the respective amounts. Each debtor pays their debt starting with 
the first creditor in line. If they still have remaining debt they proceed to repay the next creditor and so on,
until all debts are settled.