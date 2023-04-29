import { dashboard, expenses, transactions, trend, settings, stocks, news } from '../utils/Icons'

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
      icon: news,
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
   {
      id: 5,
      title: "Market predictions",
      icon: stocks,
      link: "/marketpredictions",
   },
   {
      id: 6,
      title: "Settings",
      icon: settings,
      link: "/settings",
   },
]