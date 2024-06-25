'use client'
import { URL_IMAGENES } from '@/urls'
import { FaEllipsis } from "react-icons/fa6";

import Image from 'next/image';

import useSWR from 'swr'
import TimeLine from './TimeLine'
import BotonSubirArchivo from './BotonSubirArchivo'
import { useEffect, useState } from 'react'
import ItemSideBar from './ItemSideBar';
import ChangeThemeBoton from './ChangeThemeBoton';
import ImagenesSideBar from './ImagenesSideBar';
import VideosSideBar from './VideosSideBar';
import { BsStars } from "react-icons/bs";
import ModalGenerarVideoIa from './ModalGenerarVideoIa';
import BotonCompartirVideo from './BotonCompartirVideo';
import AudiosSideBar from './AudiosSideBar';




export default function Home() {
  const [subiendo, setSubiendo] = useState(false);
  const [activeTab, setActiveTab] = useState('images');


  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">

      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-20">
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
          </div>

          <div className="flex items-center lg:order-2">

            <ChangeThemeBoton />

            {/* <button
              type="button"
              className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600"
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
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600"
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
            </button> */}


            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-gray-300 dark:focus:ring-gray-600"
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


            <BotonCompartirVideo />

          </div>
        </div>
      </nav>



      <aside
        className="flex flex-col fixed top-0 left-0 z-10 w-96 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
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
              name="search"
              id="search"
              autoComplete='off'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Buscar archivo"
            />
          </div>
        </form>


        <div className='mt-2 mx-3'>
          <BotonSubirArchivo setCargando={setSubiendo}/>
        </div>

        <div className="flex justify-between px-4 space-x-2  mt-5">
          <button
            className={`pb-1 border-b-2 font-medium px-4 ${activeTab === 'images' ? ' border-blue-700 dark:border-blue-500  dark:text-white text-gray-800' : 'text-gray-600 dark:text-gray-400  border-transparent'}`}
            onClick={() => setActiveTab('images')}
          >
            Imágenes
          </button>
          <button
            className={`pb-1 border-b-2 font-medium px-4 ${activeTab === 'videos' ? ' border-blue-700 dark:border-blue-500 dark:text-white text-gray-800' : 'text-gray-600 dark:text-gray-400 border-transparent'}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button
            className={`pb-1 border-b-2 font-medium px-4 ${activeTab === 'audios' ? ' border-blue-700 dark:border-blue-500 dark:text-white text-gray-800' : 'text-gray-600 dark:text-gray-400 border-transparent'}`}
            onClick={() => setActiveTab('audios')}
          >
            Audios
          </button>
        </div>


        <div className='flex-1 overflow-y-auto  mb-16 mt-5 '>
          {activeTab === 'images' && <ImagenesSideBar subiendo={subiendo}/>}
          {activeTab === 'videos' && <VideosSideBar subiendo={subiendo}/>}
          {activeTab === 'audios' && <AudiosSideBar subiendo={subiendo}/>}
        </div>

        

        <div className='absolute bottom-0 left-0 w-full px-4 mb-2'>
          <ModalGenerarVideoIa />
        </div>
        

      </aside>

      <main className="p-4 md:ml-96 h-screen pt-20 flex items-center justify-center pb-32">
        <div className='w-72 h-96 bg-white'>
         
        </div>
      </main>

      <div className='flex items-center select-none justify-center bg-white border-b border-gray-200 md:ml-96 px-4 py-2.5 h-32 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 bottom-0 '>
        <TimeLine />
      </div>

  </div>
  );
}
