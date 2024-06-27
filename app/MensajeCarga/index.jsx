'use client'
import React from 'react'
import Spinner from './Spinner'

function MensajeCarga({mensaje='Cargando...'}) {

  return (
    <div className={`fixed inset-0 h-screen w-screen flex justify-center text-center items-center z-20 transition-colors duration-150 `}>
      <div className="flex flex-col lg:ml-36 justify-center items-center text-center">
        <Spinner /> 
        <p className='pt-4 text-lg md:text-xl font-medium text-gray-800 dark:text-gray-100'>{mensaje}</p>
      </div>
    </div>
  )
}

export default MensajeCarga