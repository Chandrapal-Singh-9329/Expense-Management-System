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
      <div className = 'row m-3'>
        <div className = 'col-md-4'>
            <div className = 'card'>
                <div className = 'card-header'>
                    Total Transactions = {totalTransaction}
                </div>  
                    
                <div className = 'card-body'>
                    <h5 className='text-success'>Income : {totalIncomeTransactions.length} </h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTransactions.length} </h5>
                    <div>
                        <Progress type='circle' strokeColor='green' className='mx-2' percent= {totalIncomePercent.toFixed(0)} />

                        <Progress type='circle' strokeColor='red' className='mx-2' percent= {totalExpensePercent.toFixed(0)} />

                    </div>
                </div>
            </div>
        </div>

        {/* Money Card */}
                <div className='col-md-4'>
                    <div className='card'>

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

                            <div>
                                <Progress
                                    type='circle'
                                    strokeColor='green'
                                    className='mx-2'
                                    percent={totalIncomePercentByAmount.toFixed(0)}
                                />

                                <Progress
                                    type='circle'
                                    strokeColor='red'
                                    className='mx-2'
                                    percent={totalExpensePercentByAmount.toFixed(0)}
                                />
                            </div>

                        </div>

                    </div>
                </div>
      </div>



      {/* catrgory wise Income */}
      <div className='row mt-3'>
        <div className = 'col md-4'>
            <h5 className="pt-4">Categorywise Income</h5>
            {
                categories.map((category)=>{
                    const amount = allTransactions.filter((transaction) => transaction.type==='income' && transaction.category === category).reduce((acc, transaction)=> acc + transaction.amount , 0);

                    return(
                        amount > 0 &&
                    <div className='card'>
                        <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress  percent = {((amount / totalIncome)*100).toFixed(0)}  />
                            
                        </div>
                    </div>
                    )
                })
            }
        </div>

            {/* categorywise expense */}
        <div className = 'col md-4'>
            <h5 className="pt-4" >Categorywise Expense</h5>
            {
                categories.map((category)=>{
                    const amount = allTransactions.filter((transaction) => transaction.type==='expense' && transaction.category === category).reduce((acc, transaction)=> acc + transaction.amount , 0);

                    return(
                        amount > 0 &&
                    <div className='card'>
                        <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress  percent = {((amount / totalExpense)*100).toFixed(0)}  />
                            
                        </div>
                    </div>
                    )
                })
            }
        </div>


      </div>

    </>
  )
}

export default Analytics
