import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

const nav = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Manufacturing", "/manufacturing"],
  ["Export", "/export"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden bg-[#123d29] text-[#f1d98d] md:block">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-2.5 text-[12px] tracking-[.08em]">
          <span className="flex items-center gap-2"><Sparkles size={13}/> PURE CAMPHOR. DIVINE AROMA.</span>
          <div className="flex gap-7">
            <span>Premium Quality</span>
            <span>Made in India</span>
            <span>Global Supply</span>
          </div>
          <div className="flex gap-5">
            <span>info@campura.in</span>
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#eadfca] bg-[#f8f1df]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-2.5 lg:px-10">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="CAMPURA - Pure Camphor. Divine Aroma."
              className="h-12 md:h-14 lg:h-16 w-auto object-contain mix-blend-multiply transition-transform duration-200 hover:scale-[1.02]"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative py-2 text-[13px] font-medium tracking-wide transition ${
                    isActive ? "text-[#a2761d]" : "text-[#163d2b] hover:text-[#a2761d]"
                  }`
                }
              >
                {label}
                {label === "Products" && <ChevronDown className="ml-1 inline" size={13}/>}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-full bg-[#123d29] px-6 py-3 text-sm font-semibold tracking-wide text-[#f1d98d] transition hover:-translate-y-0.5 hover:bg-[#1d5138] lg:block"
          >
            GET A QUOTE ✦
          </Link>

          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#eadfca] bg-[#f8f1df] px-5 pb-5 lg:hidden">
            {nav.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className="block border-b border-[#e6dbc4] py-4 text-sm tracking-wide"
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-[#123d29] px-5 py-3 text-center text-[#f1d98d]"
            >
              GET A QUOTE
            </Link>
          </div>
        )}
      </header>
    </>
  );
}