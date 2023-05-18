import { dashboard, piggy, expenses, transactions, trend, settings, stocks, news, twitter, google } from '../utils/Icons'

export const menuItems = [
   {
      id: 1,
      title: 'Dashboard',
      icon: transactions,
      link: '/dashboard'
   },
   {
      id: 2,
      title: "Twitter News",
      icon: twitter,
      link: "/twitternews",
   },
   {
      id: 3,
      title: "Google News",
      icon: google,
      link: "/googlenews",
   },
   {
      id: 4,
      title: "Incomes",
      icon: piggy,
      link: "/incomes",
   },
   {
      id: 5,
      title: "Expenses",
      icon: trend,
      link: "/expenses",
   },
   {
      id: 6,
      title: "Market Predictions",
      icon: stocks,
      link: "/marketpredictions",
   },
   
   {
      id: 7,
      title: "Settings",
      icon: settings,
      link: "/settings",
   },
   {
      id: 8,
      title: "Realtime Prices",
      icon: settings,
      link: "/realtimeprices",
   },
]