"use client";

import { useEffect, useState } from "react";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";

const navLinks = [
  { id: "", title: "Home" },
  { id: "categories", title: "Categories" },
  { id: "about", title: "About" },
  { id: "donate", title: "Donate" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Set initial theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    document.body.classList.toggle("dark", prefersDark);
  }, []);

  // Apply dark class on change
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  const ThemeToggle = () => (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle Theme"
      className="p-2 rounded-full flex items-center justify-center btn-theme-toggle"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-theme text-theme shadow-md relative z-50 transition-colors">
      {/* Logo */}
      <div className="text-2xl font-bold hover:text-glow">
        <a href="/">CraveOut</a>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-medium text-lg items-center">
        {navLinks.map((nav) => (
          <li key={nav.title}>
            <a
              href={`#${nav.id}`}
              className="transition duration-200 hover:text-[var(--accent-hover)]"
            >
              {nav.title}
            </a>
          </li>
        ))}
        <li>
          <ThemeToggle />
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
          {navLinks.map((nav) => (
            <a
              key={nav.title}
              href={`#${nav.id}`}
              className="transition hover:text-[var(--accent-hover)]"
              onClick={() => setToggle(false)}
            >
              {nav.title}
            </a>
          ))}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
