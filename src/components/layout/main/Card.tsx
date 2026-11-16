"use client";

import { useState } from "react";
import { Check, LoaderCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/storefront/CartProvider";

type CardProps = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string | null;
};

export default function Card({
  id,
  name,
  price,
  oldPrice,
  description,
  image,
}: CardProps) {
  const { addItem, loading: cartLoading } = useCart();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const addToCart = async () => {
    setAdding(true);
    setMessage("");
    try {
      await addItem({ id, name, description, price, image });
      setMessage("Adicionado ao carrinho.");
    } catch {
      setMessage("Não foi possível adicionar. Confira o carrinho.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-stone-200 bg-white">
      <div className="aspect-square w-full overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full items-center justify-center bg-secondary text-sm text-muted-foreground"
            role="img"
            aria-label={`Imagem de ${name} não disponível`}
          >
            Imagem não disponível
          </div>
        )}
      </div>

      <div className="p-3.5">
        <h3 className="font-serif text-[17px] font-semibold leading-tight text-stone-900">
          {name}
        </h3>

        <p className="mt-2 text-[14px] leading-5 text-stone-600">
          {description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[18px] font-bold text-stone-900">
              R$ {price.toFixed(2).replace(".", ",")}
            </p>
            {oldPrice && (
              <p className="text-[12px] text-stone-500 line-through">
                R$ {oldPrice.toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => void addToCart()}
            disabled={adding || cartLoading}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {adding ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : message === "Adicionado ao carrinho." ? (
              <Check size={16} />
            ) : (
              <ShoppingCart size={16} />
            )}
            {adding ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
        {message && (
          <p
            role="status"
            className={`mt-3 text-xs ${message.startsWith("Não") ? "text-red-700" : "text-green-700"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
