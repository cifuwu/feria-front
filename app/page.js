'use client'
import imagen_1 from '@/public/imagen_1.png'
import imagen_2 from '@/public/imagen_2.png'
import imagen_3 from '@/public/imagen_3.png'
import imagen_4 from '@/public/imagen_4.png'
import imagen_5 from '@/public/imagen_5.png'

import Image from 'next/image';
import { useEffect, useState } from 'react'

import Draggable from 'react-draggable';


const TrackItem = ({ src }) => (
  <Draggable axis="x" bounds="parent">
    <div 
      className="relative h-16 bg-blue-500 dark:bg-blue-900 cursor-pointer flex items-center justify-center mx-1">
      <img src={src} alt="track" className="h-full w-auto" />
    </div>
  </Draggable>
);

const Timeline = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [posicion, setPosicion] = useState(0);
  const [posicionInicial, setPosicionInicial] = useState(0);
  const [translateInicial, setTranslateInicial] = useState(0);

  const handleMouseMove = (event) => {
    if(isDragging){
      console.log({ x: event.clientX, y: event.clientY });
      if((event.clientX + translateInicial) - posicionInicial >= 0){
        setPosicion(translateInicial + event.clientX - posicionInicial );
      }
    }
  };

  const handleMouseDown = (event) => {
    setPosicionInicial( event.clientX );
    setTranslateInicial(posicion);
    setIsDragging(true);
  };

  const handleMouseUp = (event) => {
    setPosicionInicial( event.clientX );
    setTranslateInicial(posicion);
    setIsDragging(false);
  };

  useEffect(()=>{
    console.log(posicion)
  },[posicion])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  const tracks = [
    { src: '/imagen_1.png', id: 1 },
    { src: '/imagen_2.png', id: 2 },
    { src: '/imagen_3.png', id: 3 },
    { src: '/imagen_4.png', id: 4 },
    { src: '/imagen_5.png', id: 5 },
  ];

  const renderTimeStamps = () => {
    const timeStamps = [];
    for (let i = 0; i <= 20; i++) {
      timeStamps.push(
        <div key={i} className="w-12 text-xs text-gray-500 dark:text-gray-50 text-center">
          00:{i < 10 ? `0${i}` : i}
        </div>
      );
    }
    return timeStamps;
  };

  return (
    <div className="relative border-t border-gray-300 overflow-hidden w-full h-full">
      <div className="absolute h-full w-1 bg-blue-700 z-10 cursor-pointer" 
        onMouseDown={handleMouseDown}
        style={{translate: posicion}}>
        <div className='w-5 h-5 bg-blue-700 rounded-full absolute -left-1.5'> 

        </div>
      </div>
      <div className="absolute top-0 left-0 flex items-center h-5 w-full bg-gray-200 dark:bg-gray-600 border-b border-gray-300">
        {renderTimeStamps()}
      </div>
      <div className="relative flex items-center h-16 mt-8">
        {tracks.map(track => (
          <div key={track.id} className="relative h-full w-24">
            <TrackItem src={track.src} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">

      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
{/* 
            <a href="" class="flex items-center justify-between mr-4">
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Front Feria</span>
            </a> */}
{/* 
            <form action="#" method="GET" class="hidden md:block md:pl-2">
              <label for="topbar-search" class="sr-only">Search</label>
              <div className="relative w-64 md:w-96">
                <div
                  className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form> */}

          </div>

          <div className="flex items-center lg:order-2">

            <button
              type="button"
              className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span class="sr-only">View notifications</span>
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>


            <button
              type="button"
              data-dropdown-toggle="apps-dropdown"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>

              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
            </button>


            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user photo"
              />
            </button>

          </div>
        </div>
      </nav>



      <aside
        className="fixed top-0 left-0 z-40 w-96 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >

        <form action="#" method="GET" className="mt-5 mx-3">
          <label htmlFor="topbar-search" className="sr-only">Search</label>
          <div className="relative ">
            <div
              className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="topbar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Buscar archivo"
            />
          </div>
        </form>


        <div className='mt-2 mx-3'>
          <button type="button" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Subir archivo</button>
        </div>


        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 pl-5 pr-3 mt-7'>

          <div className='grid gap-4'>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_1}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_2}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_3}/>
            </div>
          </div>

          <div className='grid gap-4'>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_4}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_1}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_2}/>
            </div>
          </div>

          <div className='grid gap-4'>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_5}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_3}/>
            </div>
            <div className='cursor-pointer transition-transform hover:scale-105'>
              <Image src={imagen_5}/>
            </div>
          </div>

        </div>
        

      </aside>

      <main className="p-4 md:ml-96 h-screen pt-20 flex items-center justify-center pb-32">
        <div className='w-72 h-96 bg-white'>
         
        </div>
      </main>

      <div className='flex items-center select-none justify-center bg-white border-b border-gray-200 md:ml-96 px-4 py-2.5 h-32 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 bottom-0 '>
        <Timeline />
      </div>

  </div>
  );
}
