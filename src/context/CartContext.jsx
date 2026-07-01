"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "numentai-cart";
const WHATSAPP_NUMBER = "6281226391579";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist cart whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.name === product.name);
      if (existing) {
        return prev.map((it) =>
          it.name === product.name ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const updateQty = (name, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((it) => it.name !== name);
      return prev.map((it) => (it.name === name ? { ...it, qty } : it));
    });
  };

  const removeItem = (name) => {
    setItems((prev) => prev.filter((it) => it.name !== name));
  };

  const clearCart = () => setItems([]);

  const totalQty = items.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items.reduce((sum, it) => sum + it.qty * (it.price || 0), 0);

  const checkoutUrl = (customer = {}) => {
    const { name = "", phone = "", address = "", note = "" } = customer;

    if (items.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Halo Numentai, saya ingin bertanya tentang produk."
      )}`;
    }
    const lines = items.map(
      (it, idx) =>
        `${idx + 1}. ${it.name} x${it.qty}${
          it.price ? ` = Rp${(it.qty * it.price).toLocaleString("id-ID")}` : ""
        }`
    );
    const totalLine = totalPrice
      ? `\n\nTotal: Rp${totalPrice.toLocaleString("id-ID")}`
      : "";

    const customerLines = [
      name ? `Nama: ${name}` : null,
      phone ? `No. HP: ${phone}` : null,
      address ? `Alamat Pengiriman: ${address}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const customerBlock = customerLines ? `\n\n${customerLines}` : "";

    const noteLine = note ? `\n\nCatatan: ${note}` : "";
    const message = `Halo Numentai, saya mau pesan:\n${lines.join(
      "\n"
    )}${totalLine}${customerBlock}${noteLine}\n\nMohon info ongkir & cara pembayarannya ya. Terima kasih!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        totalQty,
        totalPrice,
        isOpen,
        setIsOpen,
        checkoutUrl,
        WHATSAPP_NUMBER,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
