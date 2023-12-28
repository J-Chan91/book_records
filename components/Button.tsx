import { cn } from "@/lib/util";

type Variant = "primary" | "secondary" | "edit";

type Props = {
  variant: Variant;
  title: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CommonClassNames = "px-4 py-1 rounded text-white disabled:bg-gray-200";

const VariantClassNames = {
  primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  secondary: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  edit: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
};

export default function Button({ title, variant, className, ...rest }: Props) {
  return (
    <button
      className={cn(CommonClassNames, VariantClassNames[variant], className)}
      {...rest}
    >
      {title}
    </button>
  );
}
