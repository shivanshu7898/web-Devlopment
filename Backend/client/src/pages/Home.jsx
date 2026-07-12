import React from 'react'

import { FaMotorcycle } from "react-icons/fa6";
import pizza from "../assets/image.png"

function Home() {
  return (

    <div className='h-[90vh] flex justify-center items-center'>
   <div className='flex justify-end items-center rounded-full w-50 h-50 animate-spin [animation-duration:10s] '>
      <img src={pizza} alt="" />
   </div>
   

    </div>
  )
}

export default Home