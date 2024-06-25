import { URL_AI } from '@/urls'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BsStars } from 'react-icons/bs'



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



export default function ModalGenerarVideoIa() {
  const [cargando, setCargando] = useState(false);
  const [topic, setTopic] = useState('');
  let [isOpen, setIsOpen] = useState(false);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const postAux = async () => {
    setCargando(true);
    const data = {topic: topic}
    console.log(data);
    const resp = await postData(data);
    console.log(resp);

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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
