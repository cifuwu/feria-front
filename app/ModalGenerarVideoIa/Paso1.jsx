import React from 'react'

export default function Paso1({topic, setTopic=()=>{}, cargando=false, postAux=()=>{}}) {
  return (
    <div>
      <div className="mt-6">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Cómo desea el video?</label>
        <textarea id="message" value={topic} onChange={e=>{setTopic(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese instrucciones para el video...">
        </textarea>
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 hover:dark:bg-blue-800 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-50 hover:bg-blue-200 "
          onClick={postAux}
          disabled={cargando}
        >
          {cargando ? 'Cargando...' : 'Generar video'}
        </button>
      </div>
    </div>
  )
}
