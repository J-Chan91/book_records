import Image from "next/image";
import Link from "next/link";
import { RxOpenInNewWindow } from "react-icons/rx";

type Props = {
  image: string;
  title: string;
  link: string;
};

export default function ImageSection({ image, title, link }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Image src={image} alt={title} width={200} height={250} />

      <Link
        className="text-sm px-2 py-1 transition hover:text-white hover:bg-blue-400 hover:border-transparent text-gray-600 border rounded border-gray-200 justify-between flex items-center"
        target="_blank"
        href={link}
      >
        <p>책 정보</p>

        <RxOpenInNewWindow />
      </Link>
    </div>
  );
}
