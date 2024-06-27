'use client'
import { URL_GENERAR } from '@/urls';
import React, { useState, useEffect, useRef } from 'react'
import { FaUpload } from 'react-icons/fa6'
import MensajeCarga from '../MensajeCarga';



async function getVideo(id){
	return await fetch(URL_GENERAR+id,{
      cache: 'no-store' ,	
      headers: {
        'Content-Type' : 'application/json',
			},
      method: 'get'	
    })
	.then(result => result.json())
	.catch(err => console.log(err))
}


const descargarVideo = (url, nombre) => {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch(error => console.error('Error descargando el audio:', error));
};




export default function BotonCompartirVideo({idGuion}) {
	const [show, setShow] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const [cargando, setCargando] = useState(false);


	const descargar = async () => {
		setShow(false);
		setCargando(true);
		const resp = await getVideo(idGuion);
		setCargando(false);
		console.log(resp);
		if(resp?.code == 200 ){
			descargarVideo(resp?.data?.file, 'video.mp4')
		}
	}



	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current && 
				!dropdownRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setShow(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);


	useEffect(()=>{
		console.log(cargando)
	},[cargando])




	return (
		<>
			{cargando && <MensajeCarga />}
			<button
				ref={buttonRef}
				onClick={() => { setShow(!show) }}
				className='ml-5 px-4 py-2 border rounded-lg font-medium flex items-center justify-center gap-2'
			>
				<FaUpload /> Compartir
			</button>
			{show &&
				<div ref={dropdownRef} className='fixed top-14 right-5 w-full max-w-sm border rounded-lg p-2 px-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600'>
					<h3 className='font-semibold text-lg text-gray-800 dark:text-gray-200'>Generar y compartir video</h3>

					<hr className='my-2 dark:border-gray-600' />
					<div className='flex flex-col'>

						{/* <button className='text-start py-1'>Compartir en redes sociales</button> */}

						<button onClick={e=>{e.preventDefault(); descargar(); }} className='text-start py-1 font-medium'>Descargar</button>

					</div>
				</div>
			}
		</>
	)
}
