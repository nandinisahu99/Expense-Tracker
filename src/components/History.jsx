import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/ContextApi';

export default function History() {
    const {transactionHistory}=useGlobalContext()
    const [...history]=transactionHistory()
  return (
    <HistoryStyle>
        <h2>Recent Transaction</h2>
        {history.map((item)=>{
            const {_id,title,amount,type}=item;
            return (
                <div key={_id} className="item">
                    <p style={{color: type === 'expense'?'red': 'blue'}}>{title}</p>
                    <p style={{color: type === 'expense'? 'red':'blue'}}>
                        {type==='expense'? `-${amount <= 0? 0: amount}` : `+${amount<=0?0:amount}`}
                    </p>
                </div>
            )
        })}
    </HistoryStyle>
  )
}

const HistoryStyle=styled.div`
    display:flex;
    flex-direction: column;
    gap: 1rem;
    .item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.66);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;