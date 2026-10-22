"use client";

import { useCallback, useEffect, useState } from "react";
import { Grid2x2, List, Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { ManagedProduct } from "@/types/admin";
import {
  createProduct,
  deleteProduct,
  loadProducts,
  updateProduct,
} from "@/lib/products";
import ProductForm from "./ProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState<ManagedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [editing, setEditing] = useState<ManagedProduct | null | "new">(null);
  const [search, setSearch] = useState("");
  const [listView, setListView] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState<ManagedProduct["id"] | null>(
    null,
  );
  const [actionError, setActionError] = useState("");

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setLoadingError("");
    try {
      setProducts(await loadProducts());
    } catch (error) {
      setLoadingError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os produtos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshProducts();
  }, [refreshProducts]);

  const save = async (product: Omit<ManagedProduct, "id">) => {
    setSaving(true);
    setFormError("");
    try {
      const savedProduct =
        editing && editing !== "new"
          ? await updateProduct(editing.id, product)
          : await createProduct(product);
      setProducts((current) =>
        editing && editing !== "new"
          ? current.map((item) =>
              item.id === savedProduct.id ? savedProduct : item,
            )
          : [savedProduct, ...current],
      );
      setEditing(null);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o produto.",
      );
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async (id: ManagedProduct["id"]) => {
    setDeletingId(id);
    setActionError("");
    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o produto.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter((product) =>
    `${product.name} ${product.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  if (editing !== null)
    return (
      <ProductForm
        product={editing === "new" ? null : editing}
        onCancel={() => {
          setEditing(null);
          setFormError("");
        }}
        onSave={save}
        saving={saving}
        errorMessage={formError}
      />
    );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold">Produtos</h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              {products.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie o catálogo da sua loja.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setEditing("new");
          }}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
        >
          <Plus size={16} /> Novo produto
        </button>
      </div>
      <div className="flex flex-wrap gap-3 border-b border-border px-6 py-4">
        <div className="relative min-w-48 flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar produto..."
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm focus:border-ring focus:outline-none"
          />
        </div>
        <div className="flex overflow-hidden rounded-md border border-border">
          <button
            type="button"
            aria-label="Visualização em grade"
            onClick={() => setListView(false)}
            className={`p-2 ${!listView ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            <Grid2x2 size={16} />
          </button>
          <button
            type="button"
            aria-label="Visualização em lista"
            onClick={() => setListView(true)}
            className={`border-l border-border p-2 ${listView ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <p role="status" className="py-12 text-center text-sm text-muted-foreground">
            Carregando produtos...
          </p>
        ) : loadingError ? (
          <div className="py-8 text-center">
            <p role="alert" className="text-sm text-red-700">
              Não foi possível carregar os produtos: {loadingError}
            </p>
            <button
              type="button"
              onClick={() => void refreshProducts()}
              className="mt-3 text-sm font-semibold underline"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            {actionError && (
              <p role="alert" className="mb-4 text-sm text-red-700">
                Não foi possível excluir o produto: {actionError}
              </p>
            )}
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Nenhum produto encontrado.
              </p>
            ) : (
              <div
                className={
                  listView
                    ? "space-y-2"
                    : "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                }
              >
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className={
                      listView
                        ? "flex items-center justify-between rounded-lg border border-border p-3"
                        : "overflow-hidden rounded-lg border border-border bg-secondary"
                    }
                  >
                    <div className={listView ? "flex items-center gap-3" : ""}>
                      <div
                        className={
                          listView
                            ? "h-12 w-12 shrink-0 rounded-md bg-muted"
                            : "flex aspect-square items-center justify-center bg-muted text-xs text-muted-foreground"
                        }
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "Sem imagem"
                        )}
                      </div>
                      <div className={listView ? "" : "p-4"}>
                        <p className="font-semibold">{product.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {product.description}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-accent">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 p-3">
                      <button
                        type="button"
                        aria-label={`Editar ${product.name}`}
                        onClick={() => {
                          setFormError("");
                          setEditing(product);
                        }}
                        className="rounded p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Excluir ${product.name}`}
                        disabled={deletingId === product.id}
                        onClick={() => void removeProduct(product.id)}
                        className="rounded p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
