import { dashboard, expenses, transactions, trend } from '../utils/Icons'

export const menuItems = [
   {
      id: 1,
      title: 'Dashboard',
      icon: transactions,
      link: '/dashboard'
   },
   {
      id: 2,
      title: "Market news",
      icon: dashboard,
      link: "/marketnews",
   },
   {
      id: 3,
      title: "Incomes",
      icon: trend,
      link: "/incomes",
   },
   {
      id: 4,
      title: "Expenses",
      icon: expenses,
      link: "/expenses",
   },
]