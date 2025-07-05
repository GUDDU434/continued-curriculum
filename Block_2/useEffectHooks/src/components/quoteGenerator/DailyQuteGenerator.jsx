import React, { useEffect, useState } from 'react'

const DailyQuteGenerator = () => {
const [running, setRunning] = useState(false);
    useEffect(()=>{
        if(running){
console.log("hellow")
        }
    },[])
  return (
    <div>DailyQuteGenerator</div>
  )
}

export default DailyQuteGenerator