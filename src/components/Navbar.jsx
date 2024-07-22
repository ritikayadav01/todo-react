import React from 'react'
export default function Navbar() {
  return (
   <div className='flex  justify-between bg-slate-900 text-white h-11 '> 
   <div className="logo my-2">
    <span className="font-bold text-xl mx-8 my-5">TaskTackler</span>
   </div>
    <ul className="flex gap-8 mx-7 my-3">
        <li className='cursor-pointer hover:font-bold transition-all-duration-500'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all-duration-500'>Your Task</li>
    </ul>
   </div>

  )
}
