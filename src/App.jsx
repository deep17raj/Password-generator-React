import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [symAllowed,setSymAllowed] = useState(false);
  const changePassword = 
    useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) str+="1234567890";
      if(symAllowed) str+="!@#$%^&*-_()";
      for(let i=0;i<length;i++){
        let char = Math.floor(Math.random()*str.length+1);
        pass += str.charAt(char);
      }
      setPassword(pass);

    },[length,numberAllowed,symAllowed,setPassword])
  const passwordRef = useRef(null)
  useEffect(()=>{changePassword()},[length,numberAllowed,symAllowed])
  const copyClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div  >
      <h4 className='text-white text-center font-bold mt-4'>Password Generator</h4>
      <div className=' flex gap-2 justify-center mt-5'>
        <input  className='text-orange text-center font-semibold mt-4 w-1/3' type="text" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)
        }} readOnly ref={passwordRef}/>
        <button onClick={copyClipboard} className='text-white text-center font-semibold mt-4'>Copy</button>
      </div>
      <div className='flex gap-2 justify-center mt-6'>
      <input type="range" name="" id="" max={99} min={6} value={length} onChange={(e)=>{
          setLength(e.target.value)
        }}/>
        <p>length:{length}</p>
        <input type="checkbox" name="number" id="number" value={numberAllowed} onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}/>
        <label htmlFor="number">Number</label>
        <input type="checkbox" name="number" id="number" defaultChecked={symAllowed} onChange={()=>{
          setSymAllowed((prev)=>!prev)
        }}/>
        <label htmlFor="number">Symbol</label>
      </div>
    </div>
  )
}

export default App
