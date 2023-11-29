import ProgressBar from "@/components/ProgressBar";
import { RecordType } from "@/types/bookType";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  list: undefined | RecordType[];
};
export default function RecordsSection({ list }: Props) {
  return (
    <Fragment>
      {!list ? (
        <div>책을 등록해보세요</div>
      ) : (
        <div className="w-full xl:w-1/2 grid grid-cols-1 xl:grid-cols-2 gap-2">
          {list.map((item) => (
            <Link
              key={item.id}
              className=" bg-white w-full md:flex rounded border border-gray-200 px-2 py-1 transition cursor-pointer hover:border-gray-400"
              href={`/${item.id}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={240}
                height={360}
                style={{ objectFit: "contain" }}
                className="mr-2"
              />

              <div className="w-full pt-4">
                <ProgressBar
                  percent={
                    !item.current_page
                      ? 0
                      : Math.floor((item.current_page / item.total_page) * 100)
                  }
                />

                <p className="text-sm my-2">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
}
