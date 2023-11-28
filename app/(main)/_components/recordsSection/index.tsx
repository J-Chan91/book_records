import ProgressBar from "@/components/ProgressBar";
import { RecordType } from "@/types/bookType";
import Image from "next/image";
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
        // <div className="flex gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {list.map((item) => (
            <div
              key={item.id}
              className="flex rounded border border-gray-200 px-2 py-1 transition cursor-pointer hover:border-gray-400"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={240}
                height={300}
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
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
