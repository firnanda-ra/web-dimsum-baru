"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const { totalQty, setIsOpen } = useCart();
  const navItems = ["Home", "About", "Product", "Kontak"];

  // Animasi Navbar Turun saat Load
  useGSAP(
    () => {
      // Menggunakan fromTo lebih aman daripada from untuk mencegah
      // elemen menghilang (stuck di opacity 0) saat refresh
      gsap.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    },
    { scope: navRef }
  ); // Gunakan scope, hapus dependency array manual

  return (
    <nav
      ref={navRef}
      className="font-poppins fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm transition-all border-b border-white/20"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo - UBAH: Text & Color */}
        <p className="cursor-default text-2xl font-black tracking-tighter text-gray-900">
          NU<span className="text-pink-500">MENTAI</span>
        </p>

        {/* Menu Desktop */}
        <div className="hidden gap-8 text-sm font-semibold uppercase tracking-wide text-gray-700 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              // UBAH: hover:text-blue-600 -> hover:text-rose-500
              className="group relative transition hover:text-rose-500"
            >
              {item}
              {/* UBAH: bg-blue-600 -> bg-rose-500 */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Icons Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://www.instagram.com/numentai.id/?hl=id"
            target="_blank"
            // UBAH: hover:bg-blue-100 -> hover:bg-pink-100
            className="rounded-full bg-gray-100 p-2 transition hover:scale-110 hover:bg-pink-100"
          >
            <Image
              src="/images/instagram.svg"
              width={20}
              height={20}
              alt="ig"
            />
          </a>
          <a
            href="https://www.tiktok.com/@numentai.id?_r=1&_t=ZS-92bNr0bAeZu"
            target="_blank"
            className="rounded-full bg-gray-100 p-2 transition hover:scale-110 hover:bg-pink-100"
          >
            <Image src="/images/tiktok.svg" width={20} height={20} alt="tt" />
          </a>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Buka keranjang"
            className="relative rounded-full bg-gray-100 p-2 transition hover:scale-110 hover:bg-pink-100"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {totalQty}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger Mobile */}
        <button className="block md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span
              className={`block h-[2px] w-6 bg-black transition-transform origin-center ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black transition-transform origin-center ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b shadow-lg transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              // UBAH: hover:text-blue-600 -> hover:text-rose-500
              className="text-lg font-medium text-gray-800 hover:text-rose-500"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
