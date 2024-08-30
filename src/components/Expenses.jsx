import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout';
import { useGlobalContext } from '../context/ContextApi';
import IncomeItem from './IncomeItem';
import ExpenseForm from './ExpenseForm';
import { dollar } from '../utils/Icons';

export default function Expenses() {
    const {getExpenses,Expenses,deleteExpense,totalExpenses}=useGlobalContext();
    useEffect(()=>{
        getExpenses()
    },[])

  return (
    <ExpenseStyle>
        <InnerLayout>
            <h1>Expenses</h1>
            <h2 className="total-income">Total Expenses: <span>{dollar}{totalExpenses()}</span></h2>
            <div className="income-content">
                <div className="form-container">
                    <ExpenseForm/>
                </div>
                <div className="incomes">
                    {Expenses.map((item)=>{
                        const {_id,title,amount,date,category,description,type}=item;
                        return <IncomeItem key={_id}
                        id={_id} 
                        title={title} 
                        description={description} 
                        amount={amount} 
                        date={date} 
                        type={type}
                        category={category} 
                        indicatorColor="indigo"
                        deleteItem={deleteExpense} />
                    })}
                </div>
            </div>

        </InnerLayout>
    </ExpenseStyle>
  )
}

const ExpenseStyle=styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: indigo;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;
