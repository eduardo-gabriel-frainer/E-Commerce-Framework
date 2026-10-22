"use client";

import { Field } from "./Field";
import { Input } from "./Input";

export function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-border bg-card p-0.5"
        />
        <Input value={value} onChange={onChange} placeholder="#000000" />
      </div>
    </Field>
  );
}
