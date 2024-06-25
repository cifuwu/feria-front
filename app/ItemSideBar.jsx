import { URL_IMAGENES } from '@/urls';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaEllipsis, FaRegTrashCan } from 'react-icons/fa6';


async function deleteResource(id) {
  const response = await fetch(URL_IMAGENES+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const result = await response.json(); // O response.text() si esperas un texto como respuesta
  return result; // O maneja el resultado como desees
}


const descargarImagen = (url, nombre) => {
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
    .catch(error => console.error('Error descargando la imagen:', error));
};


export default function ItemSideBar({ imagen, actualizar=()=>{} }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [eliminando, setEliminando] = useState(false);


  const eliminar = async () => {
    setEliminando(true);
    setShowDropDown(false);
    const resp = await deleteResource(imagen.id);
    actualizar()
  }


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div className='flex items-center justify-center relative cursor-pointer group'>

      <div className='absolute top-0 right-8' ref={dropdownRef}>
        <button onClick={() => { setShowDropDown(!showDropDown) }} className={`absolute ${!showDropDown && 'hidden group-hover:block'}  p-0.5 m-1  border-gray-500 bg-gray-700/30 hover:bg-gray-700/40 rounded`}>
          <FaEllipsis className='text-xl text-white' />
        </button>

        {showDropDown &&
          <div id="dropdown" className="text-start absolute top-8 left-0 z-10 bg-white divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44 dark:bg-gray-700">
            <div className='px-2 py-2 text-sm'>
              <h6 className='truncate'>{imagen.nombre}</h6>
            </div>  
            <ul className="pb-2 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <button onClick={()=>{descargarImagen(imagen.imagen, imagen.nombre); setShowDropDown(!showDropDown)}} className="flex gap-2 items-center px-3 py-2 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <FaDownload />
                  Descargar
                </button>
              </li>
              <li>
                <button onClick={eliminar} className="flex gap-2 items-center px-3 py-2 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <FaRegTrashCan />
                  Eliminar
                </button>
              </li>
            </ul>
          </div>
        }
      </div>

      {eliminando && 
      <div role="status" className='absolute flex justify-center items-center w-full h-full'>
        <svg aria-hidden="true" className="w-8 h-8 mt-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      }

      <Image
        className=''
        src={imagen.imagen}
        width={imagen.width}
        alt=''
        height={imagen.height}
        blurDataURL={imagen.blurBase64}
        placeholder={imagen.blurBase64 ? 'blur' : 'empty'}
      />

    </div>
  )
}