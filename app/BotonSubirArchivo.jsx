import { URL_FILES } from '@/urls';
import React, { useRef, useState } from 'react'




export default function BotonSubirArchivo({cargando, setCargando=()=>{}}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);


    setCargando(true);
    fetch (URL_FILES, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      setCargando(false);
      console.log(data);
    })
    .catch(error => {
      setCargando(false);
      console.error(error);
    });


  };
  return (
    <>
      <input 
        multiple={false}
        accept="image/*,video/*,audio/*"
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleButtonClick} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Subir archivo</button>
    </>
  )
}
