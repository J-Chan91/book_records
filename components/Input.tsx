import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/util";

type Props = {
  title?: string;
  required: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  title,
  name,
  required = true,
  ...rest
}: Props) {
  const { register } = useFormContext();

  return (
    <label className={cn(title && "flex items-center justify-between")}>
      {title && <p className="text-sm mr-1 whitespace-nowrap">{title}</p>}

      <input
        className="w-full text-right outline-none text-sm rounded transition border border-gray-200 px-2 py-2 focus:border-gray-400"
        {...register(name ? name : "", { required })}
        {...rest}
      />
    </label>
  );
}
