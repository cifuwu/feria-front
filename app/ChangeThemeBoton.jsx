'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6';
import { FaAdjust } from "react-icons/fa";




export default function ChangeThemeBoton() {
  const { theme, setTheme } = useTheme();

  const cambiarTema = () => { 
    if(theme=='system'){
      setTheme('ligth');
    }
    else if(theme=='ligth'){
      setTheme('dark');
    }
    else if(theme=='dark'){
      setTheme('system');
    }
  }

  return (
    <button onClick={cambiarTema} className='p-2 mr-1 text-xl text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'>
      {theme == 'dark' && <FaMoon />}
      {theme == 'ligth' && <FaSun/>}
      {theme == 'system' && <FaAdjust />}
    </button>
  )
}
