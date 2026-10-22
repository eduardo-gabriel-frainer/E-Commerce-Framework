"use client";

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-md border border-border bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
    />
  );
}
