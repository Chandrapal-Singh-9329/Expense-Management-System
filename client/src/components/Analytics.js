import React from 'react'
import {Progress} from 'antd'

const Analytics = ({allTransactions}) => {
    const categories = [
        'expense',
        'food',
        'movie',
        'medicine',
        'bill',
        'fee',
        'tip',
        'project',
        'tax'
    ]


    const totalTransaction = allTransactions.length;
    const totalIncomeTransactions = allTransactions.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type ==='expense');
    const totalIncomePercent = totalTransaction ? (totalIncomeTransactions.length / totalTransaction) * 100 : 0;
    const totalExpensePercent = totalTransaction ? (totalExpenseTransactions.length / totalTransaction) * 100 : 0 ;

   
        // Total Income Amount
    const totalIncome = totalIncomeTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    // Total Expense Amount
    const totalExpense = totalExpenseTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    // Remaining Balance
    const totalBalance = totalIncome - totalExpense;

    // Percentage based on money
    const totalMoney = totalIncome + totalExpense;

    const totalIncomePercentByAmount = totalMoney
        ? (totalIncome / totalMoney) * 100
        : 0;

    const totalExpensePercentByAmount = totalMoney
        ? (totalExpense / totalMoney) * 100
        : 0;
    

  return (
  <>
    <div className='d-flex justify-content-between gap-3 flex-wrap'>

      {/* Card 1 */}
      <div className='card p-2' style={{ width: '24%' }}>
        <div className='card-header'>
          Total Transactions = {totalTransaction}
        </div>

        <div className='card-body'>
          <h5 className='text-success'>
            Income : {totalIncomeTransactions.length}
          </h5>

          <h5 className='text-danger'>
            Expense : {totalExpenseTransactions.length}
          </h5>

          <div className='d-flex justify-content-around'>
            <Progress
              type='circle'
              strokeColor='green'
              percent={totalIncomePercent.toFixed(0)}
            />

            <Progress
              type='circle'
              strokeColor='red'
              percent={totalExpensePercent.toFixed(0)}
            />
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className='card p-2' style={{ width: '24%' }}>
        <div className='card-header'>
          Total Balance = ₹{totalBalance}
        </div>

        <div className='card-body'>
          <h5 className='text-success'>
            Total Income : ₹{totalIncome}
          </h5>

          <h5 className='text-danger'>
            Total Expense : ₹{totalExpense}
          </h5>

          <div className='d-flex justify-content-around'>
            <Progress
              type='circle'
              strokeColor='green'
              percent={totalIncomePercentByAmount.toFixed(0)}
            />

            <Progress
              type='circle'
              strokeColor='red'
              percent={totalExpensePercentByAmount.toFixed(0)}
            />
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className='card p-2' style={{ width: '24%' }}>
        <div className='card-header bg-dark text-white'>
          Categorywise Income
        </div>

        <div className='card-body'>
          {
            categories.map((category) => {

              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === 'income' &&
                    transaction.category === category
                )
                .reduce(
                  (acc, transaction) => acc + transaction.amount,
                  0
                );

              return (
                amount > 0 && (
                  <div className='mb-3'>
                    <h6>{category}</h6>

                    <Progress
                      percent={((amount / totalIncome) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })
          }
        </div>
      </div>

      {/* Card 4 */}
      <div className='card p-2' style={{ width: '24%' }}>
        <div className='card-header bg-warning text-white'>
          Categorywise Expense
        </div>

        <div className='card-body'>
          {
            categories.map((category) => {

              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === 'expense' &&
                    transaction.category === category
                )
                .reduce(
                  (acc, transaction) => acc + transaction.amount,
                  0
                );

              return (
                amount > 0 && (
                  <div className='mb-3'>
                    <h6>{category}</h6>

                    <Progress
                      percent={((amount / totalExpense) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })
          }
        </div>
      </div>

    </div>
  </>
)
}

export default Analytics
