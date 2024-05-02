//import React from 'react'
import { useState } from "react";
import "./styles/bgchange.css"
export default function BgChange() {
    const [colorName,setColorName] = useState("");
    function handleClick(event){
        console.log('the fucntion is called');
        console.log('the event is  ',event.target.className);
        setColorName(event.target.className);
    }

    function handleClickAdvance(){
        return handleClick;
    }
  return (
   <div className= {`box ${colorName}`}>
    <div className="flex gap-4 justify-center bg-slate-900 p-4 mr-8 ml-8 rounded align-bottom bottom-12">
    <div className="flex-initial w-14  ">
       <button onClick={handleClick} className="bg-blue-500 rounded p-2">blue</button>
    </div>
    <div className="flex-initial w-14 ">
    <button onClick={handleClick} className="bg-green-500 p-2 rounded">green</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className="bg-red-500 p-2 rounded">red</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className="bg-cyan-500 p-2 rounded">cyan</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className="bg-yellow-500 p-2 rounded">yellow</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className=" p-2 rounded bg-lime-500">lime</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className="bg-pink-500 p-2 rounded">pink</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClick} className="bg-purple-500 p-2 rounded">purple</button>
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={(event)=>handleClick(event)} className=" p-2 rounded bg-indigo-500">indigo</button>
      {/* arrow function is called when the button is clicked but normal function called automatically
          like handleClickAdvance function in below button 
       */}
    </div>
    <div className="flex-initial w-14 ">
      <button onClick={handleClickAdvance()} className="bg-gray-500 p-2 rounded">gray</button>
    </div>
  </div>
   </div>
  )
}
