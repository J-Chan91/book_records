import { createPortal } from "react-dom";
import IconButton from "./IconButton";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "@/lib/util";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export default function Modal({
  children,
  title,
  onClose,
  className,
  ...rest
}: Props) {
  return createPortal(
    <div className="fixed left-0 top-0 bg-[rgba(255,255,255,0.5)] w-full h-full">
      <dialog
        className={cn(
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-md",
          className
        )}
        {...rest}
      >
        <div className="flex justify-between items-center bg-white">
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>

          <IconButton Icon={AiOutlineClose} onClick={onClose} />
        </div>

        {children}
      </dialog>
    </div>,
    document.body
  );
}
