import React, { createContext, useState, useContext } from "react";

const ContextApi=createContext()

export const ContextProvider=({children})=>{ 
    const [income,setIncome]=useState([])
    const [Expenses,setExpenses]=useState([])
    const [error,setError]=useState(null)

    const addIncome = (obj) => {
        fetch("https://expense-tracker-backend-jnzj.onrender.com/user/add-income", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message) });
            }
            return getIncomes();
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const getIncomes = () => {
        fetch("https://expense-tracker-backend-jnzj.onrender.com/user/get-income")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setIncome(data.income);
            console.log(data);
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const deleteIncome = (id) => {
        fetch(`https://expense-tracker-backend-jnzj.onrender.com/user/delete-income/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return getIncomes();
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const totalIncome = () => {
        let totalIncome = 0;
        console.log(income);
        income.forEach((obj) => {
            totalIncome = totalIncome+ obj.amount;
        });
        return totalIncome;
    };

    //calculate expenses
    const addExpense = (expense) => {
        fetch("https://expense-tracker-backend-jnzj.onrender.com/user/add-expense", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message) });
            }
            return getExpenses();
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const getExpenses = () => {
        fetch("https://expense-tracker-backend-jnzj.onrender.com/user/get-expense")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setExpenses(data.expense);
            console.log(data);
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const deleteExpense = (id) => {
        fetch(`https://expense-tracker-backend-jnzj.onrender.com/user/delete-expense/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return getExpenses();
        })
        .catch(err => {
            setError(err.message);
        });
    };

    const totalExpenses = () => {
        let totalExpenses = 0;
        Expenses.forEach((expense) => {
            totalExpenses += expense.amount;
        });
        return totalExpenses;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...income, ...Expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0,3);
    };

    console.log(children);
    return (
        <ContextApi.Provider value={{
            addIncome,
            getIncomes,
            income,
            deleteIncome,
            Expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </ContextApi.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(ContextApi);
};


