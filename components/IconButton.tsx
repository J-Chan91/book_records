import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  onClick: () => void;
};

export default function IconButton({ Icon, onClick }: Props) {
  return (
    <div className="hover:bg-gray-100 rounded-full p-1 transition cursor-pointer">
      <Icon size={18} className="text-gray-800" onClick={onClick} />
    </div>
  );
}
