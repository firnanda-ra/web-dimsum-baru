export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-pink-50 to-white pt-24 pb-10 overflow-hidden font-poppins">
      
      {/* === DEKORASI WAVE DI ATAS === */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-16 text-white"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* KOLOM 1: BRAND */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-black tracking-tighter text-gray-900">
              NU<span className="text-pink-500">MENTAI</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Menghadirkan kelezatan dimsum mentai premium dengan cita rasa otentik yang lumer di mulut. Dibuat dengan cinta di Semarang.
            </p>
          </div>

          {/* KOLOM 2: NAVIGASI */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-gray-900">Navigasi</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {['Home', 'About', 'Product'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="hover:text-rose-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300 group-hover:bg-rose-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: KONTAK */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-gray-900">Hubungi Kami</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Semarang, Jawa Tengah<br/>Indonesia
              </p>
              <a 
                href="https://wa.me/62881080176002" 
                target="_blank"
                className="flex items-center gap-3 hover:text-rose-500 transition-colors"
              >
                <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413 11.815 11.815 0 00-8.413-3.48C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24z"/></svg>
                +62 881-0801-76002
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-pink-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-bold text-rose-500">Numentai</span>. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <span className="text-red-500 animate-pulse">❤</span> NUMENTAI
          </p>
        </div>
      </div>
    </footer>
  )
}