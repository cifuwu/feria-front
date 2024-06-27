import { URL_AI } from '@/urls'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BsStars } from 'react-icons/bs'
import Paso1 from './Paso1'



const postData = (data) => {
  const resp = fetch(URL_AI,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
      })
    .then(result => result.json())
    .catch(err => console.log(err))
    return resp;
}



export default function ModalGenerarVideoIa({idGuion, setIdGuion=()=>{}}) {
  const [cargando, setCargando] = useState(false);
  const [topic, setTopic] = useState('');
  const [paso, setPaso] = useState(1);
  const [plantilla, setPlantilla] = useState('humoristico');
  const [subtitulos, setSubtitulos] = useState('romantico');
  const [edicion, setEdicion] = useState('humoristico');
  const [script, setScript] = useState('humoristico');
  let [isOpen, setIsOpen] = useState(false);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const postAux = async () => {
    setCargando(true);
    const data = {topic: topic, script_style: script, subtitle_style: subtitulos, editing_style: edicion}
    console.log(data);
    const resp = await postData(data);
    console.log(resp);
    setIdGuion(resp?.id);

    setCargando(false);
    closeModal();
  }









  return (
    <>
      <div className="">
        <button 
          type='button'
          onClick={openModal}
          className='text-white flex items-center justify-center gap-2 w-full bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
          Generar video automáticamente
          <BsStars className='text-xl'/>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex gap-2 text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Generar video con IA <BsStars className='text-xl'/>
                  </Dialog.Title>
                  
                  <div className="mt-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿De qué trata el video?</label>
                    <textarea id="message" value={topic} onChange={e=>{setTopic(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese de qué trata el video...">
                    </textarea>
                  </div>


                  {/* <div>
                    <div className="mt-6">
                      <h5 className=''>Seleccione plantilla</h5>
                      <div className='grid grid-cols-3 mt-3'>
                        <button onClick={()=>{setPlantilla('humoristico')}} className={`${plantilla=='humoristico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          humoristico
                        </button>
                        <button onClick={()=>{setPlantilla('formal')}} className={`${plantilla=='formal' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          formal
                        </button>
                        <button onClick={()=>{setPlantilla('educativo')}} className={`${plantilla=='educativo' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          educativo
                        </button>
                        <button onClick={()=>{setPlantilla('artistico')}} className={`${plantilla=='artistico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          artistico
                        </button>
                        <button onClick={()=>{setPlantilla('infantil')}} className={`${plantilla=='infantil' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          infantil
                        </button>
                        <button onClick={()=>{setPlantilla('historico')}} className={`${plantilla=='historico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          historico
                        </button>
                      </div>
                    </div>
                  </div> */}


                  <div>
                    <div className="mt-6">
                      <h5 className=''>Estilo de script</h5>
                      <div className='grid grid-cols-3 mt-3'>
                        <button onClick={()=>{setScript('humoristico')}} className={`${script=='humoristico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          humoristico
                        </button>
                        <button onClick={()=>{setScript('formal')}} className={`${script=='formal' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          formal
                        </button>
                        <button onClick={()=>{setScript('educativo')}} className={`${script=='educativo' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          educativo
                        </button>
                        <button onClick={()=>{setScript('artistico')}} className={`${script=='artistico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          artistico
                        </button>
                        <button onClick={()=>{setScript('infantil')}} className={`${script=='infantil' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          infantil
                        </button>
                        <button onClick={()=>{setScript('historico')}} className={`${script=='historico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          historico
                        </button>
                      </div>
                    </div>
                  </div>


                  <div>
                    <div className="mt-6">
                      <h5 className=''>Estilo de edición</h5>
                      <div className='grid grid-cols-3 mt-3'>
                        <button onClick={()=>{setEdicion('humoristico')}} className={`${edicion=='humoristico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          humoristico
                        </button>
                        <button onClick={()=>{setEdicion('formal')}} className={`${edicion=='formal' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          formal
                        </button>
                        <button onClick={()=>{setEdicion('educativo')}} className={`${edicion=='educativo' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          educativo
                        </button>
                        <button onClick={()=>{setEdicion('artistico')}} className={`${edicion=='artistico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          artistico
                        </button>
                        <button onClick={()=>{setEdicion('infantil')}} className={`${edicion=='infantil' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          infantil
                        </button>
                        <button onClick={()=>{setEdicion('historico')}} className={`${edicion=='historico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          historico
                        </button>
                      </div>
                    </div>
                  </div>




                  <div>
                    <div className="mt-6">
                      <h5 className=''>Estilo de subtitulos</h5>
                      <div className='grid grid-cols-3 mt-3'>
                        <button onClick={()=>{setSubtitulos('romantico')}} className={`${subtitulos=='romantico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          romantico
                        </button>
                        <button onClick={()=>{setSubtitulos('infantil_azul')}} className={`${subtitulos=='infantil_azul' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          infantil_azul
                        </button>
                        <button onClick={()=>{setSubtitulos('infantil_rosa')}} className={`${subtitulos=='infantil_rosa' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          infantil_rosa
                        </button>
                        <button onClick={()=>{setSubtitulos('neon')}} className={`${subtitulos=='neon' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          neon
                        </button>
                        <button onClick={()=>{setSubtitulos('formal')}} className={`${subtitulos=='formal' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          formal
                        </button>
                        <button onClick={()=>{setSubtitulos('artistico')}} className={`${subtitulos=='artistico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          artistico
                        </button>
                        <button onClick={()=>{setSubtitulos('retro')}} className={`${subtitulos=='retro' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          retro
                        </button>
                        <button onClick={()=>{setSubtitulos('moderno')}} className={`${subtitulos=='moderno' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          moderno
                        </button>
                        <button onClick={()=>{setSubtitulos('elegante')}} className={`${subtitulos=='elegante' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          elegante
                        </button>
                        <button onClick={()=>{setSubtitulos('metalico')}} className={`${subtitulos=='metalico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          metalico
                        </button>
                        <button onClick={()=>{setSubtitulos('educativo')}} className={`${subtitulos=='educativo' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          educativo
                        </button>
                        <button onClick={()=>{setSubtitulos('humoristico')}} className={`${subtitulos=='humoristico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          humoristico
                        </button>
                        <button onClick={()=>{setSubtitulos('salud')}} className={`${subtitulos=='salud' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          salud
                        </button>
                        <button onClick={()=>{setSubtitulos('filosofico')}} className={`${subtitulos=='filosofico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          filosofico
                        </button>
                        <button onClick={()=>{setSubtitulos('historico')}} className={`${subtitulos=='historico' ? 'text-gray-900 border-gray-300 dark:text-white bg-gray-100  dark:bg-gray-700 dark:border-gray-600' : 'text-gray-900 bg-white border-gray-300 dark:text-white dark:border-gray-600  hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600'} border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}>
                          historico
                        </button>
                      </div>
                    </div>
                  </div>


                  
                  
                  <div className="mt-6 flex w-full justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 hover:dark:bg-blue-800 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-50 hover:bg-blue-200 "
                      onClick={postAux}
                      disabled={cargando}
                    >
                      {cargando ? 'Cargando...' : 'Generar video'}
                    </button>
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
