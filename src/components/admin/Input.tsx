"use client";

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none"
    />
  );
}
