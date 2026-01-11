import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Tailwind dark mode 
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
