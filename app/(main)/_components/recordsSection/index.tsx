"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { RecordType } from "@/types/bookType";
import SearchModal from "../searchModal";
import { getRecords } from "@/api/book";

type Props = {
  list: undefined | RecordType[];
};
export default function RecordsSection({ list }: Props) {
  const [records, setRecords] = useState<undefined | RecordType[]>([]);

  const updateRecords = async () => {
    const res = await getRecords();

    if (res) {
      setRecords(res);
    }
  };

  useEffect(() => {
    setRecords(list);
  }, [list]);

  return (
    <div className="my-4 flex flex-col justify-center gap-2 overflow-auto">
      <div className="w-full">
        <SearchModal onUpdateRecords={updateRecords} />
      </div>

      {!records ? (
        <div>책을 등록해보세요</div>
      ) : (
        <div className="w-full justify-center grid grid-cols-1 xl:grid-cols-2 gap-2">
          {records.map((item) => (
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
    </div>
  );
}
