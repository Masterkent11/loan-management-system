import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export function Input({ error, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="field" htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} aria-invalid={Boolean(error)} {...props} />
      {error ? <small role="alert">{error}</small> : null}
    </label>
  );
}
