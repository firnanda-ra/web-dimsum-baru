"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // 1. Header Animasi (Judul)
    gsap.from(".about-header", {
      scrollTrigger: {
        trigger: ".about-header",
        start: "top 85%", // Mulai saat elemen masuk 85% viewport
        end: "top 20%",
        toggleActions: "play reverse play reverse", // BARU: Mainkan animasi bolak-balik
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // 2. Konten Kartu (Card) - Efek Scale & Fade
    gsap.from(".about-content", {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse", // BARU: Animasi ulang saat scroll naik
      },
      scale: 0.9, // Efek Zoom in
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)" // Efek membal sedikit
    });

  }, { scope: aboutRef });

  return (
    <section ref={aboutRef} id="about" className="relative py-24 min-h-[60vh] flex flex-col items-center justify-center">
      
      {/* Title Decoration */}
      <div className="about-header mb-16 flex flex-col items-center gap-4">
        {/* UBAH: Badge Blue jadi Pink */}
        <span className="rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-600">
          Our Story
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tentang Kami</h2>
        {/* UBAH: Garis Bawah Blue jadi Gradient Pink */}
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
      </div>

      {/* Main Content */}
      <div className="about-content w-full max-w-4xl px-6 text-center">
        <div className="relative rounded-3xl bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-pink-100">
          
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 p-4 text-white shadow-lg shadow-pink-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Satu Gigitan, <br />
            <span className="text-pink-500">Lumer Sejuta Rasa.</span>
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            "Berawal dari kecintaan pada cita rasa Jepang yang otentik, 
            <span className="font-semibold text-rose-500"> Numentai </span> 
            hadir untuk mendefinisikan ulang cara menikmati dimsum. Kami memadukan 
            padatnya daging ayam pilihan dengan saus mentai racikan rahasia yang 
            <em>creamy</em>, gurih, dan sedikit <em>smoky</em>. Ini bukan sekadar camilan, 
            tapi pelukan hangat di setiap suapan."
          </p>
        </div>
      </div>
    </section>
  );
}