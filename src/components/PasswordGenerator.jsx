//import React from 'react'

import { useState ,useEffect} from "react";

export default function PasswordGenerator() {
       const[password,setPassword] = useState("");
       const[includeNumber,setincludeNumber] = useState(false);
       const[includeSpecialChar,setincludeSpecialChar] = useState(false);
       const[sliderRange,setSliderRange] = useState(8);

       function randomPasswordGenerator(isIncludeNumber = false,isIncludeSpecialChar = false) {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let specialCharacters = "!@#$%^&*()";
        if(isIncludeNumber){
            characters += numbers;
            console.log('the characters is (in case of number) ',characters);
        }

        if(isIncludeSpecialChar){
            characters += specialCharacters;
            console.log('the characters is (in case of Special Char) ',characters);
        }
       
      
        let password = "";
        for (let i = 0; i < sliderRange; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;

       }

       function handleChange(event){
          console.log('the event is ',event);
          let rangeNumber = event.target.value;
          console.log('the range number is ',Number(rangeNumber));
          setSliderRange(Number(rangeNumber));
         
          setPassword(randomPasswordGenerator(includeNumber,includeSpecialChar));

        
       }


       function handleChangeCheckboxNumber(event){
           console.log('the value of event is ',event.target.checked);
           setPassword(randomPasswordGenerator(event.target.checked,includeSpecialChar));
           setincludeNumber(event.target.checked);
       }
       
       function handleChangeCheckboxSpecialChar(event){
        console.log('the value of event is ',event.target.checked);
        setPassword(randomPasswordGenerator(includeNumber,event.target.checked));
        setincludeSpecialChar(event.target.checked);
       }

       function handleClick(){
          console.log('handleClick is called and password is ',password);
          console.log('the navigator object is ',navigator);
          console.log('the clipboard object is ',navigator.clipboard);
          navigator.clipboard.writeText(password)
          .then((data)=>{
             console.log('password are copied to clipboard and data is ',data);
          })
          .catch((error)=>{
             console.log('error is ',error);
           })
       }

       useEffect(()=>{
        
        console.log('the useEffect is called');
        let password1 = randomPasswordGenerator();
        setPassword(password1);
       },
       []
    )
     
  return (

    <div className="container mx-auto mt-8">
        <div className="container">
            <h1>Random Password Generator</h1>
           <p>Create strong and secure passwords to keep your account safe online.</p> 
        </div>
        <input  type="text" className=" border-2 border-solid border-black rounded w-96 h-8" value={password} readOnly/>
        <button className="btn bg-purple-500 p-1 rounded px-2" onClick={handleClick}>Copy</button>
        <br/>
        <input className="mr-3" type="range" step={1} min={8} max={25} defaultValue={8} onChange={handleChange} />
        <span className="mr-2">{sliderRange}</span>
        <label className="mr-2">number</label>
        <input  className="mr-2" type="checkbox" onChange={handleChangeCheckboxNumber}/>
        <label className="mr-2">character</label>
        <input type="checkbox" onChange={handleChangeCheckboxSpecialChar}/>
    </div>

  )
}
