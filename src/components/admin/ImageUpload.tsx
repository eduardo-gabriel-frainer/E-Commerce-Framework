"use client";

import { ChangeEvent, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { Field } from "./Field";

export function ImageUpload({
  label,
  hint,
  value,
  onChange,
  square = false,
}: {
  label: string;
  hint?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  square?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };
  return (
    <Field label={label} hint={hint} full>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {value ? (
        <div className="group relative inline-block w-full">
          <img
            src={value}
            alt={label}
            className={`rounded-md border border-border object-cover ${square ? "h-32 w-32" : "h-40 w-full"}`}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remover imagem"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/80 text-background opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground ${square ? "h-32 max-w-xs" : "h-36"}`}
        >
          <ImagePlus size={24} />
          <span className="text-sm">Clique para enviar imagem</span>
          <span className="text-xs">PNG, JPG ou SVG até 5 MB</span>
        </button>
      )}
    </Field>
  );
}
