import React from 'react'
import ReactDOM from 'react-dom/client'
import "./components/styles/style.css"
// import { HeroOne } from './components/Hero';
// import Card from './components/Card';
// import Counter from './components/Counter';
//import BgChange from './components/BgChange'
//import PasswordGenerator from './components/PasswordGenerator'
//import CustomizedTables from './components/Table'
//import CustomizedTables1 from './components/AdvanceTable'
import CustomizedTablesWithPagination from './components/TableWithPagination'
// import CustomizedTablesPiChart from './components/PieChart'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <HeroOne/>
    <Card username = "Bharat" arr = {[10,20,30,40]}/>
    <Card username = "yadav"/>
    <Counter/> */}
    {/* <BgChange/> */}
    {/* <PasswordGenerator/> */}
    {/* <CustomizedTables/> */}
    {/* <div>something below</div> */}
    {/* <CustomizedTables1/> */}

    {/* <div>below is the table with pagination</div> */}

    <CustomizedTablesWithPagination/>
    {/* <div>below is the table with pagination</div> */}
    {/* <CustomizedTablesPiChart/> */}
   
  </React.StrictMode>,
)
