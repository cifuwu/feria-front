'use client'

import { datosprueba } from '@/caca';
import { useEffect, useState } from 'react'

import Draggable from 'react-draggable';




const fetcher = async url => {
  const resp = await fetch(url,{
    cache: 'no-store',
    headers: {
      'Content-Type' : 'application/json',
  }}
  ).then(r => r.json())

  return resp;
}



const TrackItem = ({ src }) => (
  <Draggable axis="x" bounds="parent">
    <div 
      className="relative h-16 bg-blue-500 dark:bg-blue-900 cursor-pointer flex items-center justify-center mx-1">
      <img src={src} alt="track" className="" />
    </div>
  </Draggable>
);

export default function Timeline (){
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
      <div className="absolute h-full w-1 bg-blue-700 z-50 cursor-pointer group" 
        onMouseDown={handleMouseDown}
        style={{translate: posicion}}>
        <div className='w-5 h-5 bg-blue-700 rounded-full absolute -left-2 group-hover:scale-125 transition-transform'> 

        </div>
      </div>
      <div className="absolute top-0 left-0 flex items-center h-5 w-full bg-gray-200 dark:bg-gray-600 border-b border-gray-300">
        {renderTimeStamps()}
      </div>
      <div className="relative flex items-center h-16 mt-8">
        {datosprueba.generated_video?.clips?.map(track => (
          <div key={track.id} className="relative h-full w-24">
            <TrackItem src={track.path} />
          </div>
        ))}
      </div>
    </div>
  );
};
