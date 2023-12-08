"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { RecordType } from "@/types/bookType";
import SearchModal from "../searchModal";
import { getRecords } from "@/api/book";
import Button from "@/components/Button";
import { cn } from "@/lib/util";

type Props = {
  list: undefined | RecordType[];
};
export default function RecordsSection({ list }: Props) {
  const [records, setRecords] = useState<undefined | RecordType[]>([]);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

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
    <>
      {isOpenSearchModal && (
        <SearchModal
          open={isOpenSearchModal}
          onClose={() => setIsOpenSearchModal(false)}
          onUpdateRecords={updateRecords}
        />
      )}

      <div
        className={cn(
          "my-4 h-full flex flex-col items-center gap-2 overflow-auto",
          !records?.length && "justify-center"
        )}
      >
        {!records ? (
          <div className="gap-2 p-20 border rounded shadow flex flex-col items-center justify-center">
            <p className="text-sm">책을 등록해보세요!</p>

            <Button
              title="책 등록"
              variant="primary"
              className="text-sm"
              onClick={() => setIsOpenSearchModal(true)}
            />
          </div>
        ) : (
          <div className="w-full lg:w-1/2">
            <div className="w-full mb-4">
              <Button
                title="책 등록"
                variant="primary"
                className="text-sm"
                onClick={() => setIsOpenSearchModal(true)}
              />
            </div>

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
                          : Math.floor(
                              (item.current_page / item.total_page) * 100
                            )
                      }
                    />

                    <p className="text-sm my-2">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
