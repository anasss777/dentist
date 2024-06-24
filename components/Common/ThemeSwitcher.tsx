"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { svgDarkMode, svgLightMode } from "../svgPaths";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return <div className={`text-transparent h-[17px] w-[17px]`}>.</div>;

  if (resolvedTheme === "dark") {
    return (
      <div className="cursor-pointer" onClick={() => setTheme("light")}>
        {svgLightMode}
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="cursor-pointer" onClick={() => setTheme("dark")}>
        {svgDarkMode}
      </div>
    );
  }
};

export default ThemeSwitcher;
