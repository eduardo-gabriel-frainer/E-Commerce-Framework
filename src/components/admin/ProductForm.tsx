"use client";

import { useState } from "react";
import type { ManagedProduct } from "@/types/admin";
import type { ManagedProductInput } from "@/lib/products";
import { Field } from "./Field";
import { ImageUpload } from "./ImageUpload";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

export default function ProductForm({
  product,
  onCancel,
  onSave,
  saving,
  errorMessage,
}: {
  product: ManagedProduct | null;
  onCancel: () => void;
  onSave: (product: ManagedProductInput) => Promise<void>;
  saving: boolean;
  errorMessage: string;
}) {

  const [form, setForm] = useState<ManagedProductInput>(
    product
      ? {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
        }
      : {
      name: "",
      description: "",
      price: 0,
      image: null,
        },
  );
  const botaoDisable = !form.name.trim() || !form.description.trim() || !form?.image || !form?.price;
  const update = <K extends keyof ManagedProductInput>(
    key: K,
    value: ManagedProductInput[K],
  ) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="mb-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Voltar para produtos
          </button>
          <h2 className="font-display text-xl font-semibold">
            {product ? "Editar produto" : "Novo produto"}
          </h2>
        </div>
      </div>
      {errorMessage && (
        <p role="alert" className="px-6 pt-4 text-sm text-red-700">
          {errorMessage}
        </p>
      )}
      <div className="grid gap-8 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Field label="Título do produto" hint="Nome exibido na loja.">
            <Input
              value={form.name}
              onChange={(value) => update("name", value)}
              placeholder="Ex: Tábua de Churrasco Grande"
            />
          </Field>
          <Field label="Descrição" hint="Materiais, dimensões e diferenciais.">
            <Textarea
              value={form.description}
              onChange={(value) => update("description", value)}
              placeholder="Descreva o produto..."
              rows={5}
            />
          </Field>
          <Field label="Preço (R$)">
            <Input
              type="number"
              value={form.price ? String(form.price) : ""}
              onChange={(value) => update("price", Number(value) || 0)}
              placeholder="0,00"
            />
          </Field>
        </div>
        <div>
          <ImageUpload
            label="Imagem do produto"
            hint="Recomendado: foto quadrada, mínimo 600x600px."
            square
            value={form.image}
            onChange={(value) => update("image", value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-border px-6 py-5">
        <button
          type="button"
          disabled={saving}
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={botaoDisable || saving}
          onClick={() => onSave(form)}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-40"
        >
          {saving ? "Salvando..." : "Salvar produto"}
        </button>
      </div>
    </div>
  );
}
