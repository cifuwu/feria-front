'use client'
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react";


export function Providers({children}) {
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  },[])

  if (!mounted){
    return(
      <>
        {children}
      </>
    )
  }

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      {children}
    </ThemeProvider>
  )
}