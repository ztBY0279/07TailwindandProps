

import { useState } from 'react'
export default function Counter() {
    const [count, setCount] = useState(0);
    const [name,setName] = useState("Narayan");
    function handleCount(){
       setCount(count + 1);
       setName("Bharat")
    }
    function handleCount1(){
        setCount(count - 1);
    }
  return (
    <div className="text-center m-8">
        <button onClick={handleCount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Add Value {count} {name}
        </button>
         <button onClick={handleCount1} className=" bg-cyan-200 text-white font-bold py-2 px-4 rounded">
            remove value {count} 
         </button>
    </div>
  )
}


