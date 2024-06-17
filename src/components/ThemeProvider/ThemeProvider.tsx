"use client";
import ThemeContext from "@/context/themeContext";
import { ReactNode, useEffect, useState } from "react";


const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme")
      ? JSON.parse(localStorage.getItem("hotel-theme")!)
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState<boolean>(false)

  useEffect(()=>{
    setRenderComponent(true)
  },[])

  if(!renderComponent) return <></>

  return <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
    <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
      <div className="dark:text-white dark:bg-black text-[#1e1e1e]">
        {children}
      </div>
    </div>
  </ThemeContext.Provider>;
};

export default ThemeProvider;
