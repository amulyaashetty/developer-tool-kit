import { CATEGORIES, type Category } from "@/lib/tools";
import { cn } from "@/lib/utils";

export type CategoryFilterValue = Category | "All";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}) {
  const options: CategoryFilterValue[] = ["All", ...CATEGORIES];
  return (
    <div role="group" aria-label="Filter tools by category" className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            value === option
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-transparent text-muted-foreground hover:border-border-strong hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
