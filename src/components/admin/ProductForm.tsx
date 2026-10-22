"use client";

import { useState } from "react";
import { ManagedProduct } from "@/types/admin";
import { Field } from "./Field";
import { ImageUpload } from "./ImageUpload";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

export default function ProductForm({
  product,
  onCancel,
  onSave,
}: {
  product: ManagedProduct | null;
  onCancel: () => void;
  onSave: (product: ManagedProduct) => void;
}) {
  const [form, setForm] = useState<ManagedProduct>(
    product ?? {
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      image: null,
    },
  );
  const update = <K extends keyof ManagedProduct>(
    key: K,
    value: ManagedProduct[K],
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
        <button
          type="button"
          disabled={!form.name.trim()}
          onClick={() => onSave(form)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Salvar produto
        </button>
      </div>
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
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={!form.name.trim()}
          onClick={() => onSave(form)}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-40"
        >
          Salvar produto
        </button>
      </div>
    </div>
  );
}
