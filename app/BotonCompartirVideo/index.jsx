'use client'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa6'

export default function BotonCompartirVideo() {
	const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={()=>{setShow(!show)}} className='ml-5 px-4 py-2 border rounded-lg font-medium flex items-center justify-center gap-2'>
				<FaUpload /> Compartir
			</button>
			{show &&
			<div className='fixed top-14 right-5 w-full max-w-sm border rounded-lg p-2 px-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600'>
				<h3 className='font-semibold text-lg text-gray-800 dark:text-gray-200'>Generar y compartir video</h3>
				
				<hr className='my-2 dark:border-gray-600'/>
				<div className='flex flex-col'>

					<button className='text-start py-1'>Compartir en redes sociales</button>

					<button className='text-start py-1'>Descargar</button>

				</div>
			</div>
			}
    </>
  )
}
