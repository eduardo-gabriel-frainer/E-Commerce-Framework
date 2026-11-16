"use client";

import Link from "next/link";
import {
  ArrowLeft,
  LoaderCircle,
  Minus,
  PackageOpen,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useCart, type CartItem } from "@/components/storefront/CartProvider";
import { useStorefrontSettings } from "@/components/storefront/StorefrontProvider";

export default function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    loading,
    error,
    updateQuantity,
    removeItem,
    clearCart,
    refresh,
  } = useCart();
  const settings = useStorefrontSettings();
  const [busyItem, setBusyItem] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const checkoutUrl = getWhatsAppCheckoutUrl(
    settings.whatsappLink,
    settings.whatsapp,
    items,
    subtotal,
  );

  const changeQuantity = async (item: CartItem, quantity: number) => {
    setBusyItem(item.id);
    setActionError("");
    try {
      await updateQuantity(item, quantity);
    } catch (updateError) {
      setActionError(
        updateError instanceof Error
          ? updateError.message
          : "Não foi possível atualizar o carrinho.",
      );
    } finally {
      setBusyItem(null);
    }
  };

  const deleteItem = async (item: CartItem) => {
    setBusyItem(item.id);
    setActionError("");
    try {
      await removeItem(item);
    } catch (removeError) {
      setActionError(
        removeError instanceof Error
          ? removeError.message
          : "Não foi possível remover este produto.",
      );
    } finally {
      setBusyItem(null);
    }
  };

  const emptyCart = async () => {
    if (!window.confirm("Deseja remover todos os produtos do carrinho?")) return;
    setActionError("");
    try {
      await clearCart();
    } catch (clearError) {
      setActionError(
        clearError instanceof Error
          ? clearError.message
          : "Não foi possível esvaziar o carrinho.",
      );
    }
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-10 sm:px-10 lg:px-8">
      <Link
        href="/#produtos"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Continuar comprando
      </Link>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-accent">Sua seleção</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Meu carrinho</h1>
        </div>
        {!loading && itemCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "itens"}
          </span>
        )}
      </div>

      {(error || actionError) && (
        <div
          role="alert"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <span>{actionError || error}</span>
          <button
            type="button"
            onClick={() => {
              setActionError("");
              void refresh();
            }}
            className="font-semibold underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {loading ? (
        <div
          role="status"
          className="flex min-h-64 items-center justify-center gap-3 text-muted-foreground"
        >
          <LoaderCircle size={20} className="animate-spin" />
          Carregando seu carrinho...
        </div>
      ) : error ? (
        <div className="mt-8 rounded-xl border border-border bg-card px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">
            Não foi possível carregar o carrinho
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Confira se a autenticação anônima está ativada no Supabase e se o
            script da tabela do carrinho foi executado.
          </p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="mt-5 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Tentar novamente
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
            <PackageOpen size={30} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Seu carrinho está vazio</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Explore os produtos da loja e adicione ao carrinho os que você
            gostar.
          </p>
          <Link
            href="/#produtos"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            Ver produtos
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section
            aria-label="Produtos no carrinho"
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
              <h2 className="font-semibold">Produtos adicionados</h2>
              <button
                type="button"
                onClick={() => void emptyCart()}
                className="text-xs font-medium text-muted-foreground transition hover:text-red-700"
              >
                Esvaziar carrinho
              </button>
            </div>
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6"
                >
                  {item.product_image ? (
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="h-24 w-24 shrink-0 rounded-lg border border-border object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-secondary text-center text-xs text-muted-foreground"
                      role="img"
                      aria-label={`Imagem de ${item.product_name} não disponível`}
                    >
                      Sem imagem
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{item.product_name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {item.product_description}
                    </p>
                    <p className="mt-3 font-semibold">
                      {formatCurrency(Number(item.product_price))}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        aria-label={`Diminuir quantidade de ${item.product_name}`}
                        disabled={busyItem === item.id || loading}
                        onClick={() =>
                          void changeQuantity(item, item.quantity - 1)
                        }
                        className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-9 text-center text-sm font-semibold"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Aumentar quantidade de ${item.product_name}`}
                        disabled={
                          busyItem === item.id || loading || item.quantity >= 99
                        }
                        onClick={() =>
                          void changeQuantity(item, item.quantity + 1)
                        }
                        className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={busyItem === item.id || loading}
                      onClick={() => void deleteItem(item)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Resumo do pedido</h2>
            <div className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>Subtotal ({itemCount} itens)</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>Frete</span>
                <span>A combinar</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="font-semibold">Total dos produtos</span>
              <span className="text-xl font-bold">
                {formatCurrency(subtotal)}
              </span>
            </div>
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Finalizar pelo WhatsApp
              </a>
            ) : (
              <p className="mt-6 rounded-md bg-secondary px-4 py-3 text-center text-sm leading-5 text-secondary-foreground">
                Configure um número de WhatsApp válido nas informações da loja
                para receber pedidos.
              </p>
            )}
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              O frete e a forma de pagamento serão combinados com a loja pelo
              WhatsApp.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getWhatsAppCheckoutUrl(
  configuredLink: string,
  configuredPhone: string,
  items: CartItem[],
  subtotal: number,
) {
  const phone = getWhatsAppPhone(configuredLink, configuredPhone);
  if (!phone || items.length === 0) return "";

  const orderLines = items
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product_name}: ${formatCurrency(Number(item.product_price) * item.quantity)}`,
    )
    .join("\n");
  const message = [
    "Olá! Gostaria de fazer este pedido:",
    "",
    orderLines,
    "",
    `Total dos produtos: ${formatCurrency(subtotal)}`,
    "Gostaria de combinar o frete e a forma de pagamento.",
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function getWhatsAppPhone(link: string, phone: string) {
  const configuredDigits = phone.replace(/\D/g, "");
  if (isValidPhone(configuredDigits)) return configuredDigits;

  try {
    const url = new URL(link);
    if (url.hostname === "wa.me") {
      const linkDigits = url.pathname.replace(/\D/g, "");
      if (isValidPhone(linkDigits)) return linkDigits;
    }
    if (url.hostname.endsWith("whatsapp.com")) {
      const linkDigits = (url.searchParams.get("phone") ?? "").replace(
        /\D/g,
        "",
      );
      if (isValidPhone(linkDigits)) return linkDigits;
    }
  } catch {
    return "";
  }

  return "";
}

function isValidPhone(value: string) {
  return value.length >= 10 && value.length <= 15 && !/^0+$/.test(value);
}
