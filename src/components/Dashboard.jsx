import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout';
import Chart from './Chart';
import { useGlobalContext } from '../context/ContextApi';
import { dollar } from '../utils/Icons';
import History from './History';

export default function Dashboard() {
  const {getIncomes,getExpenses,totalIncome,income,totalExpenses,Expenses,totalBalance}=useGlobalContext();
  useEffect(()=>{
    getIncomes()
    getExpenses()
  },[])

  return (
    <DashboardStyle>
        <InnerLayout>
           <h1>All Transactions</h1>
           <div className="statistic">
              <div className='chart'>
                  <Chart/>
                  <div className="amount">
                    <div className="income">
                      <h2>Total Income</h2>
                      <p>
                        {dollar} {totalIncome()}
                      </p>
                    </div>
                    <div className="expenses">
                      <h2>Total Expenses</h2>
                      <p>
                        {dollar} {totalExpenses()}
                      </p>
                    </div>
                    <div className="balance">
                      <h2>Total Balance</h2>
                      <p>
                        {dollar} {totalBalance()}
                      </p>
                    </div>
                  </div>
              </div>
              <div className="history">
                  <History />
                  <h2 className='S-Title'>MIN <span>Expenses</span>MAX</h2>
                  <div className="salary">
                      <p>
                        ${Math.min(...Expenses.map(item=>item.amount))}
                      </p>
                      <p>
                        ${Math.max(...Expenses.map(item=>item.amount))}
                      </p>
                  </div>
                  <h2 className='S-Title'>MIN <span>Salary</span>MAX</h2>
                  <div className="salary">
                    <p>
                      ${Math.min(...income.map(item=>item.amount))}
                    </p>
                    <p>
                      ${Math.max(...income.map(item=>item.amount))}
                    </p>
                  </div>
              </div>
           </div>
        </InnerLayout>
    </DashboardStyle>
  )
}

const DashboardStyle=styled.div`
  .statistic{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart{
            grid-column: 1 / 4;
            height: 400px;
            .amount{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expenses{
                    grid-column: span 2;
                }
                .income, .expenses, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 2.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
            }
        }

        .history{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .S-Title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;