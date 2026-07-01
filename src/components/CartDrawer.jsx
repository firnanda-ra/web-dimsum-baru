"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

// ─────────────────────────────────────────────────────────────
// GANTI dengan URL Google Apps Script milik kamu
// Panduan lengkap ada di file: SETUP_GOOGLE_SHEETS.md
// ─────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUVvhxZXRgHBUgQ3q_QrCeIJ3mS-7TuT7-x6mVD4mDn2LQLmAQKuYfyPEoa2KSLdSr/exec";

// ─────────────────────────────────────────────────────────────
// GANTI dengan path gambar QRIS kamu (taruh di /public/images/)
// ─────────────────────────────────────────────────────────────
const QRIS_IMAGE = "/images/qris.jpg";

// Nama rekening / bank yang tampil di modal
const NAMA_TOKO    = "NUMENTAI DIMSUM";
const NAMA_BANK    = "BCA";   // ganti sesuai bank kamu

export default function CartDrawer() {
  const {
    items, isOpen, setIsOpen,
    updateQty, removeItem,
    totalQty, totalPrice,
    checkoutUrl, clearCart,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "", phone: "", address: "", note: "",
  });
  const [touched,     setTouched]     = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [sending,     setSending]     = useState(false);
  const [sheetDone,   setSheetDone]   = useState(false);

  const isValid = customer.name.trim() !== "" && customer.address.trim() !== "";

  /* ── 1. Buka modal checkout ── */
  const handleCheckoutClick = () => {
    if (!isValid) { setTouched(true); return; }
    setSheetDone(false);
    setShowModal(true);
  };

  /* ── 2. Kirim data ke Google Sheets + buka WA ── */
  const handleConfirmPayment = async () => {
    setSending(true);

    const orderLines = items
      .map((it, i) =>
        `${i + 1}. ${it.name} x${it.qty}${
          it.price ? ` = Rp${(it.qty * it.price).toLocaleString("id-ID")}` : ""
        }`
      )
      .join("\n");

    const payload = {
      timestamp : new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      nama      : customer.name,
      no_hp     : customer.phone,
      alamat    : customer.address,
      pesanan   : orderLines,
      total     : totalPrice ? `Rp${totalPrice.toLocaleString("id-ID")}` : "-",
      catatan   : customer.note,
      status    : "Menunggu Konfirmasi",
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method : "POST",
        body   : JSON.stringify(payload),
        // no-cors karena Apps Script tidak kirim CORS header
        mode   : "no-cors",
      });
    } catch (_) {
      // no-cors selalu throw network error, tapi data tetap terkirim
    } finally {
      setSending(false);
      setSheetDone(true);
    }

    // Buka WhatsApp
    window.open(checkoutUrl(customer), "_blank");

    // Reset setelah 1.5 detik
    setTimeout(() => {
      clearCart();
      setCustomer({ name: "", phone: "", address: "", note: "" });
      setTouched(false);
      setShowModal(false);
      setIsOpen(false);
    }, 1500);
  };

  /* ── Tutup modal ── */
  const closeModal = () => { if (!sending) setShowModal(false); };

  return (
    <>
      {/* ── Overlay drawer ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer ── */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pink-100">
          <h3 className="text-lg font-black text-gray-900">
            Keranjang <span className="text-pink-500">Pesanan</span>
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-gray-500 hover:bg-pink-50 hover:text-rose-500 transition"
            aria-label="Tutup keranjang"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400 gap-3">
              <svg className="w-14 h-14 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm font-medium">Keranjang masih kosong.<br />Yuk pilih dimsum favoritmu!</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((it) => (
                <li key={it.name} className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50/40 p-3">
                  {it.img && (
                    <img src={it.img} alt={it.name} className="h-16 w-16 rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 line-clamp-2">{it.name}</p>
                    {it.price && (
                      <p className="text-xs font-semibold text-rose-500 mt-0.5">
                        Rp{it.price.toLocaleString("id-ID")}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(it.name, it.qty - 1)} className="h-7 w-7 rounded-full bg-white border border-pink-200 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition">−</button>
                      <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                      <button onClick={() => updateQty(it.name, it.qty + 1)} className="h-7 w-7 rounded-full bg-white border border-pink-200 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition">+</button>
                      <button onClick={() => removeItem(it.name)} className="ml-auto text-xs font-semibold text-gray-400 hover:text-rose-500 transition">Hapus</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — form + tombol */}
        {items.length > 0 && (
          <div className="border-t border-pink-100 px-6 py-5 bg-pink-50/30">

            {/* Form data pemesan */}
            <div className="flex flex-col gap-2.5 mb-4">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Data Pemesan</p>
              <input
                type="text"
                placeholder="Nama lengkap *"
                value={customer.name}
                onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-rose-400 transition ${
                  touched && !customer.name.trim() ? "border-rose-400 bg-rose-50" : "border-pink-200 bg-white"
                }`}
              />
              <input
                type="tel"
                placeholder="No. HP / WhatsApp"
                value={customer.phone}
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                className="w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400 transition"
              />
              <textarea
                placeholder="Alamat lengkap pengiriman *"
                value={customer.address}
                onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                rows={2}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-rose-400 resize-none transition ${
                  touched && !customer.address.trim() ? "border-rose-400 bg-rose-50" : "border-pink-200 bg-white"
                }`}
              />
              <input
                type="text"
                placeholder="Catatan tambahan (opsional)"
                value={customer.note}
                onChange={(e) => setCustomer((c) => ({ ...c, note: e.target.value }))}
                className="w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400 transition"
              />
              {touched && !isValid && (
                <p className="text-xs font-semibold text-rose-500">⚠ Mohon isi nama dan alamat dulu ya.</p>
              )}
            </div>

            {/* Ringkasan total */}
            <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
              <span>Total item</span>
              <span className="font-bold text-gray-800">{totalQty}</span>
            </div>
            {totalPrice > 0 && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Estimasi Total</span>
                <span className="text-base font-black text-rose-500">Rp{totalPrice.toLocaleString("id-ID")}</span>
              </div>
            )}

            {/* Tombol checkout */}
            <button
              onClick={handleCheckoutClick}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg transition ${
                isValid ? "bg-rose-500 shadow-pink-200 hover:bg-rose-600" : "bg-rose-300 shadow-none cursor-default"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Lanjut ke Pembayaran
            </button>

            <button
              onClick={() => {
                clearCart();
                setCustomer({ name: "", phone: "", address: "", note: "" });
                setTouched(false);
              }}
              className="mt-3 w-full text-center text-xs font-semibold text-gray-400 hover:text-rose-500 transition"
            >
              Kosongkan keranjang
            </button>
          </div>
        )}
      </aside>

      {/* ══════════════════════════════════════════════════════
          Modal Konfirmasi Pembayaran
      ══════════════════════════════════════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div onClick={closeModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100 bg-gradient-to-r from-rose-50 to-pink-50">
              <div>
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide">Langkah terakhir</p>
                <h2 className="text-base font-black text-gray-900">Konfirmasi Pembayaran</h2>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-gray-400 hover:bg-pink-100 hover:text-rose-500 transition" disabled={sending}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {/* Ringkasan pesanan */}
              <div className="px-6 pt-5 pb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Pesanan kamu</p>
                <ul className="flex flex-col gap-1.5">
                  {items.map((it) => (
                    <li key={it.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{it.name} <span className="text-gray-400">×{it.qty}</span></span>
                      {it.price && (
                        <span className="font-semibold text-gray-800">Rp{(it.qty * it.price).toLocaleString("id-ID")}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {totalPrice > 0 && (
                  <div className="mt-3 flex items-center justify-between border-t border-dashed border-pink-200 pt-3">
                    <span className="text-sm font-bold text-gray-700">Total Transfer</span>
                    <span className="text-lg font-black text-rose-500">Rp{totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                )}
              </div>

              {/* QRIS */}
              <div className="px-6 py-4">
                <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/40 p-4 flex flex-col items-center gap-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Scan QRIS untuk Bayar</p>
                  <img
                    src={QRIS_IMAGE}
                    alt="QRIS Numentai"
                    className="w-48 h-48 object-contain rounded-xl"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Placeholder jika gambar QRIS belum ada */}
                  <div
                    style={{ display: "none" }}
                    className="w-48 h-48 bg-pink-100 rounded-xl flex flex-col items-center justify-center gap-2 text-center"
                  >
                    <svg className="w-10 h-10 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-xs font-semibold text-rose-400">Taruh file QRIS kamu<br />di /public/images/qris.png</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-gray-800">{NAMA_TOKO}</p>
                    <p className="text-xs text-gray-500">{NAMA_BANK}</p>
                  </div>
                </div>
              </div>

              {/* Info pemesan */}
              <div className="px-6 pb-4">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 flex flex-col gap-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Dikirim ke</p>
                  <p className="text-sm font-bold text-gray-800">{customer.name}</p>
                  {customer.phone && <p className="text-xs text-gray-500">{customer.phone}</p>}
                  <p className="text-xs text-gray-600 mt-0.5">{customer.address}</p>
                  {customer.note && <p className="text-xs text-gray-400 italic">Catatan: {customer.note}</p>}
                </div>
              </div>
            </div>

            {/* Modal footer — tombol konfirmasi */}
            <div className="border-t border-pink-100 px-6 py-4 bg-pink-50/30">
              {sheetDone ? (
                <div className="flex items-center justify-center gap-2 py-3 text-green-600 font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pesanan terkirim! WhatsApp sudah terbuka.
                </div>
              ) : (
                <button
                  onClick={handleConfirmPayment}
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:bg-rose-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Mengirim pesanan...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Sudah Bayar — Konfirmasi via WA
                    </>
                  )}
                </button>
              )}
              {!sheetDone && (
                <p className="mt-2 text-center text-xs text-gray-400">
                  Setelah klik, WA akan terbuka otomatis untuk konfirmasi ke admin.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
