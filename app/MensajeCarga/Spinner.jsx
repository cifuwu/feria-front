import React from 'react'

export default function Spinner({h='60px', w='60px'}) {
  return (
    <div role="status">
      <svg
        style={{height: h, width: w}}
        className={`container-spinner`}
        viewBox="0 0 40 40"
        height="40"
        width="40"
      >
        <circle 
          className="track"
          cx="20" 
          cy="20" 
          r="17.5" 
          pathLength="100" 
          strokeWidth="5px" 
          fill="none" 
        />
        <circle 
          className="car"
          cx="20" 
          cy="20" 
          r="17.5" 
          pathLength="100" 
          strokeWidth="5px" 
          fill="none" 
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
