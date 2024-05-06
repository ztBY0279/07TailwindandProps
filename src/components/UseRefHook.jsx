//import React from 'react'
import { useRef, useState } from "react"
export default function UseRefHook() {
    console.log('the useRef is called:',Math.random());
    const count = useRef(0);
    const [countUi,setCountUi] = useState(0);
    function handleUseRef(){
        count.current++;
        alert(`the value of count is ${count.current}`)
        //setCountUi(count.current);
    }
    function handleState(){
        setCountUi(countUi+1);
    }
    console.log('the useRef is below called:',Math.random());

  return (
    <div>

    <button className="bg-blue-500 rounded" onClick={handleUseRef}>click me for useRef </button><br/>
    <button className="bg-cyan-500 rounded" onClick={handleState}>click me to change state {countUi}</button>
      
    </div>
  )
}
