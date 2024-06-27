import { URL_AUDIOS } from '@/urls';
import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaEllipsis, FaRegTrashCan } from 'react-icons/fa6';



async function deleteResource(id) {
  const response = await fetch(URL_AUDIOS+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const result = await response.json(); // O response.text() si esperas un texto como respuesta
  return result; // O maneja el resultado como desees
}


const descargarAudio = (url, nombre) => {
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




export default function ItemAudioSideBar({audio, actualizar=()=>{}}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [eliminando, setEliminando] = useState(false);


  const eliminar = async () => {
    setEliminando(true);
    setShowDropDown(false);
    const resp = await deleteResource(audio.id);
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
    <div className='border rounded-lg px-4 py-2 flex items-center relative cursor-pointer group'>
      <div className='absolute top-0 right-8' ref={dropdownRef}>
        <button onClick={() => { setShowDropDown(!showDropDown) }} className={`absolute ${!showDropDown && 'hidden group-hover:block'}  p-0.5 m-1  border-gray-500 bg-gray-700/30 hover:bg-gray-700/40 rounded`}>
          <FaEllipsis className='text-xl text-white' />
        </button>

        {showDropDown &&
          <div id="dropdown" className="text-start absolute top-8 left-0 z-50 bg-white divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="pb-2 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <button onClick={()=>{descargarAudio(audio.audio, audio.nombre); setShowDropDown(!showDropDown)}} className="flex gap-2 items-center px-3 py-2 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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

      <h3 className='text-sm font-medium'>{audio.nombre}</h3>
    </div>
  )
}
