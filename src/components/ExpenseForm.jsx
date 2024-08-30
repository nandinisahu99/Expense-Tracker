import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { plus } from '../utils/Icons';
import { useGlobalContext } from '../context/ContextApi';

export default function ExpenseForm() {
    const {addExpense}=useGlobalContext()
    const [input, setInput] = useState({ title: '', amount: '', date: '', category: '', description: '' })
    const { title, amount, date, category, description } = input;
    
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSbumit= (e)=>{
        e.preventDefault();
        addExpense(input);
        setInput({ title: '', amount: '', date: '', category: '', description: '' })
    }

    return (
        <ExpenseFormStyle onSubmit={handleSbumit}>
            <div className="input-control">
                <input type="text" value={title} onChange={handleChange} name='title' placeholder='Expense Title' />
            </div>
            <div className="input-control">
                <input type="text" value={amount} onChange={handleChange} name='amount' placeholder='Expense Amount' />
            </div>
            <div className="input-control">
                <DatePicker id='date' placeholderText='Enter Date' selected={date} dateFormat="dd/mm/yyy" onChange={(date) => {
                    setInput({ ...input, date: date })
                }} />
            </div>
            <div className="selects input-control">
                <select value={category} onChange={handleChange} name="category" required>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add Reference' id="description" cols="30" rows="4" onChange={handleChange}></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit">
                    {plus}
                    Add Expense
                </button>
            </div>
        </ExpenseFormStyle>
    )
}

const ExpenseFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
    
    .selects{
        display: flex;
        justify-content: flex;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: #b39ddb !important;
            }
            font-family: inherit;
            font-size: inherit;
            display: flex;
            align-items: center;
            gap: .5rem;
            cursor: pointer;
            border-radius:30px;
            padding: .8rem 1.6rem;
        }
    }
`;
