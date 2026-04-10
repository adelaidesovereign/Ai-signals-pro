import { cn } from "@/lib/cn";

export function Input({
  className,
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label htmlFor={id} className="block space-y-2">
      {label && (
        <span className="font-sans text-xs uppercase tracking-[0.15em] text-sage">
          {label}
        </span>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded-soft border border-sage/20 bg-cream-warm px-4 py-3 text-base text-sage-deep outline-none transition-colors duration-200 focus:border-sage focus:ring-2 focus:ring-sage/15",
          className,
        )}
        {...props}
      />
    </label>
  );
}

export function Textarea({
  className,
  label,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label htmlFor={id} className="block space-y-2">
      {label && (
        <span className="font-sans text-xs uppercase tracking-[0.15em] text-sage">
          {label}
        </span>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full rounded-soft border border-sage/20 bg-cream-warm px-4 py-3 text-base text-sage-deep outline-none transition-colors duration-200 focus:border-sage focus:ring-2 focus:ring-sage/15",
          className,
        )}
        {...props}
      />
    </label>
  );
}
