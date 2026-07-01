"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SocialIcon } from "../ui";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Dimsum Mentai"];

const products = [
  {
    name: "Dimsum Mentai isi 16",
    img: "/images/mentai3.jpeg",
    tag: "Best Seller",
    price: 45000,
    category: "Dimsum Mentai",
  },
  {
    name: "Dimsum Mentai isi 6",
    img: "/images/mentai1.jpeg",
    tag: "Favorit",
    price: 20000,
    category: "Dimsum Mentai",
  },
  {
    name: "Dimsum Mentai isi 4",
    img: "/images/dimsum4.jpg",
    tag: "Hemat",
    price: 15000,
    category: "Dimsum Mentai",
  },
  {
    name: "Dimsum Mentai Keju isi 16",
    img: "/images/mentai2.jpeg",
    tag: "New",
    price: 50000,
    category: "Dimsum Mentai",
  },
  {
    name: "Dimsum Mentai Nori + Keju isi 6",
    img: "/images/dimsumnori.jpeg",
    tag: "Combo",
    price: 23000,
    category: "Dimsum Mentai",
  },
];

export default function Section3() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Semua") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useGSAP(
    () => {
      // 1. ANIMASI HEADER (Judul)
      gsap.from(".product-header", {
        scrollTrigger: {
          trigger: ".product-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
      });

      // 2. ANIMASI GRID PRODUK (Stagger)
      // Menggunakan batch agar animasi lebih responsif saat scroll cepat
      ScrollTrigger.batch(".product-card", {
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeave: (batch) =>
          gsap.set(batch, { opacity: 0, y: -50, overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeaveBack: (batch) =>
          gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
        start: "top 90%",
        end: "bottom 10%",
      });

      // 3. ANIMASI REVIEW
      gsap.from(".review-card", {
        scrollTrigger: {
          trigger: ".review-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="product"
      className="py-24 px-4 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] relative z-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ===== HEADER PRODUK ===== */}
        <div className="product-header mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Produk Unggulan
          </h2>
          <p className="mx-auto max-w-xl text-gray-500">
            Dari mentah hingga siap saji, nikmati kerenyahan asli Nusantara.
          </p>

          {/* Filter Kategori */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-rose-500 text-white shadow-md shadow-pink-200"
                    : "bg-pink-50 text-rose-500 hover:bg-pink-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ===== GRID PRODUK ===== */}
        <div className="product-grid grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 mb-32 px-4">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              // UBAH: Card dengan shadow pink lembut, border tipis, dan efek hover naik
              className="product-card group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-pink-100 shadow-[0_8px_30px_rgba(255,192,203,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,105,180,0.25)]"
            >
              {/* 1. IMAGE CONTAINER (Full Width / Edge-to-Edge) */}
              {/* Menghilangkan padding agar gambar terlihat penuh dan lezat */}
              <div className="relative aspect-square w-full overflow-hidden bg-rose-50">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient Halus di bawah gambar agar teks tidak terlalu 'nabrak' jika ada */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Tag Floating dengan efek Glass (Kaca) */}
                <span className="absolute top-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-rose-500 backdrop-blur-md shadow-sm">
                  {product.tag}
                </span>
              </div>

              {/* 2. INFO SECTION */}
              <div className="flex flex-1 flex-col p-5">
                {/* Nama Produk */}
                <h3 className="mb-1 text-base font-black text-gray-800 line-clamp-2 leading-snug group-hover:text-rose-500 transition-colors">
                  {product.name}
                </h3>

                {/* Harga */}
                <p className="mb-4 text-sm font-bold text-rose-500">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>

                {/* Tombol Action */}
                <button
                  onClick={() => addItem(product)}
                  className="mt-auto relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-pink-50 py-3 text-sm font-bold text-rose-500 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-pink-200"
                >
                  <span className="relative z-10">Tambah</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== REVIEW & SOCIAL ===== */}
        <div className="flex flex-col items-center border-t border-pink-100 pt-20 pb-10 bg-white relative overflow-hidden">
          {/* Dekorasi Background (Opsional - agar lebih manis) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-pink-50 to-transparent opacity-60 -z-10"></div>

          {/* Heading dengan aksen Pink */}
          <h2 className="text-4xl font-black mb-12 text-gray-900 text-center leading-tight">
            Kata Mereka Tentang <br />
            <span className="text-pink-500 relative">
              Numentai
              {/* Garis bawah wavy kecil */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-pink-300 opacity-60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </h2>

          {/* ===== REVIEW & SOCIAL ===== */}

          {/* Container Review */}
          <div className="w-full max-w-6xl px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  text: "Saus mentainya beneran lumer! Ayamnya padet banget, bukan kebanyakan tepung. Fix langganan!",
                  name: "Gigin",
                  role: "Mahasiswa UDINUS",
                },
                {
                  text: "Anak-anak suka banget, creamy tapi nggak bikin eneg. Solusi praktis kalau lagi malas masak snack.",
                  name: "Ibu NandaWati",
                  role: "Ibu Rumah Tangga",
                },
                {
                  text: "Jujur ini dimsum mentai paling worth it. Rasanya premium, sausnya smoky-nya dapet banget.",
                  name: "Igdo",
                  role: "Foodie Semarang",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  // FIX: Menghapus z-index aneh, memastikan background putih bersih & shadow pink
                  className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border-2 border-pink-50 shadow-[0_10px_40px_-10px_rgba(255,192,203,0.4)] transition-transform duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-[0_20px_40px_-10px_rgba(255,105,180,0.3)]"
                >
                  <div className="text-yellow-400 text-2xl mb-4 drop-shadow-sm">
                    ★★★★★
                  </div>

                  <p className="italic text-gray-600 mb-6 text-base leading-relaxed">
                    "{review.text}"
                  </p>

                  <div className="mt-auto">
                    <div className="font-black text-gray-900 text-lg">
                      {review.name}
                    </div>
                    <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mt-1">
                      {review.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Icons - Menggunakan Layout Sederhana agar tidak hilang */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">
              Temukan kami di sosial media
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/numentai.id/?hl=id"
                target="_blank"
                className="flex items-center justify-center w-14 h-14 bg-pink-50 rounded-full text-rose-500 transition-all hover:bg-rose-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-pink-200"
              >
                {/* Fallback jika image svg tidak ada, akan muncul kotak pink */}
                <img
                  src="/images/instagram.svg"
                  alt="IG"
                  className="w-6 h-6 brightness-0 opacity-80 hover:invert"
                />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@numentai.id?_r=1&_t=ZS-92bNr0bAeZu"
                target="_blank"
                className="flex items-center justify-center w-14 h-14 bg-pink-50 rounded-full text-rose-500 transition-all hover:bg-black hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-gray-300"
              >
                <img
                  src="/images/tiktok.svg"
                  alt="TT"
                  className="w-6 h-6 brightness-0 opacity-80 hover:invert"
                />
              </a>
            </div>
            <p className="text-pink-400 font-bold">@numentai.id</p>
          </div>
        </div>
      </div>
    </section>
  );
}
