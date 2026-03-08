import { useEffect, useState } from "react";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const THEME_KEY = "craveout-theme";

const Navbar = () => {
  // Mobile responsive navbar and theme states
  const [toggle, setToggle] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const setTheme = (darkMode: boolean) => {
    setIsDark(darkMode);
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  };

  // Set initial theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "dark") {
      setTheme(true);
      return;
    }
    if (savedTheme === "light") {
      setTheme(false);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-theme text-theme shadow-md relative z-50">
      {/* Logo */}
      <div className="text-2xl font-bold hover:text-glow">
        <Link to="/" className="cursor-pointer">
          CraveOut
        </Link>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-medium text-lg items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-[var(--accent)]" : "hover:text-[var(--accent-hover)]"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-[var(--accent)]" : "hover:text-[var(--accent-hover)]"
              }`
            }
          >
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ai-chat"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-[var(--accent)]" : "hover:text-[var(--accent-hover)]"
              }`
            }
          >
            AI Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ai-recipes"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive ? "text-[var(--accent)]" : "hover:text-[var(--accent-hover)]"
              }`
            }
          >
            AI Recipes
          </NavLink>
        </li>
        <li>
          {/* ThemeToggle */}
          <button
            onClick={() => setTheme(!isDark)}
            aria-label="Toggle Theme"
            className="p-2 rounded-full flex items-center justify-center btn-theme-toggle"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setToggle((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {toggle ? <BiMenuAltLeft size={28} /> : <BiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {toggle && (
        <div className="absolute top-16 right-4 w-44 bg-theme text-theme rounded-lg shadow-lg p-4 flex flex-col gap-4 md:hidden border border-[var(--accent)]">
          <NavLink
            to="/"
            className="text-left transition hover:text-[var(--accent-hover)]"
            onClick={() => setToggle(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className="text-left transition hover:text-[var(--accent-hover)]"
            onClick={() => setToggle(false)}
          >
            Favorites
          </NavLink>
          <NavLink
            to="/ai-chat"
            className="text-left transition hover:text-[var(--accent-hover)]"
            onClick={() => setToggle(false)}
          >
            AI Chat
          </NavLink>
          <NavLink
            to="/ai-recipes"
            className="text-left transition hover:text-[var(--accent-hover)]"
            onClick={() => setToggle(false)}
          >
            AI Recipes
          </NavLink>
          {/* ThemeToggle */}
          <button
            onClick={() => setTheme(!isDark)}
            aria-label="Toggle Theme"
            className="p-2 rounded-full flex items-center justify-center btn-theme-toggle"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
