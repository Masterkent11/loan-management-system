import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  label: string;
  options: Array<{ label: string; value: string | number }>;
};

export function Select({ error, id, label, options, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="field" htmlFor={selectId}>
      <span>{label}</span>
      <select id={selectId} aria-invalid={Boolean(error)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <small role="alert">{error}</small> : null}
    </label>
  );
}
