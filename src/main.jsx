import React from 'react'
import ReactDOM from 'react-dom/client'
import "./components/styles/style.css"
import { HeroOne } from './components/Hero';
import Card from './components/Card';
import Counter from './components/Counter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroOne/>
    <Card username = "Bharat" arr = {[10,20,30,40]}/>
    <Card username = "yadav"/>
    <Counter/>
  </React.StrictMode>,
)
