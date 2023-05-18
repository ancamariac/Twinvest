import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

   const [incomes, setIncomes] = useState([])
   const [expenses, setExpenses] = useState([])
   const [error, setError] = useState(null)
   const [interests, setInterests] = useState([])
   const [news, setNews] = useState([])
   const [predictions, setPredictions] = useState([]) 
   const [interestsPrices, setInterestsPrices] = useState([])

   //calculate incomes
   const addIncome = async (income) => {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}add-income`, income, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
         .catch((err) => {
            setError(err.response.data.message)
         })
      getIncomes()
   }

   const getIncomes = async () => {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}get-incomes`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      setIncomes(response.data)
   }

   const deleteIncome = async (id) => {
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
      getIncomes();
   }

   const totalIncome = () => {
      let totalIncome = 0;
      incomes.forEach((income) => {
         totalIncome = totalIncome + income.amount
      })
      return totalIncome;
   }

   //calculate expenses
   const addExpense = async (expense) => {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}add-expense`, expense, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
         .catch((err) => {
            setError(err.response.data.message)
         })
      getExpenses()
   }

   const getExpenses = async () => {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}get-expenses`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      setExpenses(response.data)
   }

   const deleteExpense = async (id) => {
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
      getExpenses()
   }

   const totalExpenses = () => {
      let totalExpenses = 0;
      expenses.forEach((exp) => {
         totalExpenses = totalExpenses + exp.amount
      })

      return totalExpenses;
   }

   const totalBalance = () => {
      return totalIncome() - totalExpenses()
   }

   const transactionHistory = () => {
      const history = [...incomes, ...expenses]
      history.sort((a, b) => {
         return new Date(b.createdAt) - new Date(a.createdAt)
      })

      return history.slice(0, 4)
   }

   const saveToken = (token) => {
      sessionStorage.removeItem('auth-token');
      sessionStorage.setItem('auth-token', token);
   }

   const getToken = () => {
      return sessionStorage.getItem('auth-token');
   }

   const getUser = () => {
      const user = sessionStorage.getItem('user');
      if (user) {
         return JSON.parse(user);
      }
      return {};
   }

   const saveUser = (user) => {
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(user));
   }

   const getInterests = async () => {

      const token = getToken();
      const response = await axios.get(`${BASE_URL}get-interests`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      setInterests(response.data)
   }

   const getNews = async () => {

      const token = getToken(); 
      const response = await axios.get(`${BASE_URL}get-news`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      setNews(response.data)
   }

   const getPredictions = async () => {

      const token = getToken(); 
      const response = await axios.get(`${BASE_URL}get-predictions`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      setPredictions(response.data)
   }

   const getInterestsPrices = async () => {

      try {
         const token = getToken(); 
         const response = await axios.get(`${BASE_URL}get-interests-prices`, {
            headers: {
               'Authorization': `Basic ${token}`
            }
         });
         setInterestsPrices(response.data); // Assuming response.data is an array
      } catch (error) {
         // Handle any error that occurred during the API call
         console.log("flasssssssssssssss")
         console.error(error);
         setError('Failed to fetch interests prices');
      }
   }

   const addInterest = async (interest) => {
      const token = getToken();
      const response = await axios.put(`${BASE_URL}update-interests`, { interests: interest.interest }, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
         .catch((err) => {
            setError(err.response.data.message)
            console.log(err)
         })
      getInterests()
   }

   const deleteInterest = async (interest) => {
      const token = getToken();
      const response = await axios.put(`${BASE_URL}delete-interest`, { interests: interest }, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
         .catch((err) => {
            setError(err.response.data.message)
         })
      getInterests()
   }

   return (
      <GlobalContext.Provider value={{
         addIncome,
         getIncomes,
         incomes,
         deleteIncome,
         expenses,
         totalIncome,
         addExpense,
         getExpenses,
         deleteExpense,
         totalExpenses,
         addInterest,
         getInterests,
         deleteInterest,
         interests,
         news,
         getNews,
         predictions,
         getPredictions,
         interestsPrices,
         getInterestsPrices,
         totalBalance,
         transactionHistory,
         error,
         setError,
         saveToken,
         saveUser,
         getToken,
         getUser
      }}>
         {children}
      </GlobalContext.Provider>
   )
}

export const useGlobalContext = () => {
   return useContext(GlobalContext)
}