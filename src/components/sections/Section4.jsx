"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Pilih Menu",
    desc: "Tambahkan dimsum favoritmu ke keranjang.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Checkout WhatsApp",
    desc: "Klik checkout, pesananmu otomatis terkirim rapi ke admin kami.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4z",
  },
  {
    title: "Konfirmasi & Bayar",
    desc: "Admin konfirmasi ongkir & total, lalu kamu transfer pembayaran.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Dimsum Diantar",
    desc: "Pesanan diproses & dikirim hangat langsung ke alamatmu.",
    icon: "M5 13l4 4L19 7",
  },
];

export default function Section4() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from(".order-step", {
        scrollTrigger: {
          trigger: ".order-steps",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="kontak" className="relative py-24 px-4 bg-pink-50/40">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-600">
            Cara Pesan
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Pesan Cuma 4 Langkah
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>

        {/* Steps */}
        <div className="order-steps grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-24">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="order-step relative flex flex-col items-center rounded-3xl bg-white p-6 text-center border border-pink-100 shadow-[0_8px_30px_rgba(255,192,203,0.25)]"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white shadow-md">
                {i + 1}
              </span>
              <div className="mt-4 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-rose-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="contact-card grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(255,182,193,0.3)] border border-pink-100 md:grid-cols-2">
          {/* Map */}
          <div className="relative min-h-[280px] w-full bg-pink-100">
            <iframe
              title="Lokasi Numentai"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Semarang,Jawa%20Tengah&output=embed"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
            <h3 className="text-2xl font-black text-gray-900">
              Hubungi <span className="text-rose-500">Numentai</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Punya pertanyaan soal menu, pesanan dalam jumlah besar, atau kerja
              sama reseller? Tim kami siap membantu setiap hari.
            </p>

            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Semarang, Jawa Tengah, Indonesia</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Setiap hari, 09.00 – 21.00 WIB</span>
              </div>
              <a
                href="https://wa.me/62881080176002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-rose-500 transition-colors"
              >
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413 11.815 11.815 0 00-8.413-3.48C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24z" />
                </svg>
                +62 881-0801-76002
              </a>
            </div>

            <a
              href="https://wa.me/62881080176002?text=Halo%20Numentai%2C%20saya%20mau%20bertanya%20tentang%20produk."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:bg-rose-600"
            >
              Chat Sekarang
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
