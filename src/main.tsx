import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import "./assets/css/index.scss"
import "@/api/initAdmin"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
