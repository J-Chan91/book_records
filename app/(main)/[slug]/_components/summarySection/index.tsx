"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";
import useDebounce from "@/hooks/useDebounce";
import { RecordType } from "@/types/bookType";
import { patchCurrentPage } from "@/api/book";

type Props = { record: RecordType };

export default function SummarySection({ record }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [percent, setPercent] = useState(0);
  const debounceValue = useDebounce<number>(currentPage, 600);

  const debounceChangeCurrentPage = async () => {
    const result = !currentPage
      ? 0
      : Math.floor((currentPage / record.total_page) * 100);

    const res = await patchCurrentPage(record.id.toString(), currentPage);

    if (res) {
      setPercent(result);
    } else {
      alert("오류가 발생했어요. 다시 시도해주세요!");
    }
  };

  const changeIpt = (e: FormEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    let result = value.replace(/[^0-9]/g, "");

    if (result === "") {
      result = "0";
    }

    let numResult = parseInt(result);

    if (numResult > record.total_page) {
      alert("총 페이지 수 보다 클 수 없어요");
      numResult = 0;
    }

    setCurrentPage(numResult);
  };

  useEffect(() => {
    if (record) {
      setCurrentPage(!record.current_page ? 0 : record.current_page);
    }
  }, [record]);

  useEffect(() => {
    debounceChangeCurrentPage();
  }, [debounceValue]);

  return (
    <div className="p-2">
      <div className="w-full flex justify-center my-2">
        <Image src={record.image} alt={record.title} width={320} height={420} />
      </div>

      <hr className="my-2" />

      <div className="flex flex-col gap-2 text-sm w-full">
        <p>{record.author}</p>

        <div className="flex w-full items-center justify-between">
          <div className="w-full mr-2">
            <ProgressBar percent={percent} />
          </div>

          <div className="flex items-center gap-1">
            <input
              className="max-w-[50px] text-center outline-none text-sm rounded transition border border-gray-200 px-2 py-2 focus:border-gray-400"
              type="text"
              value={currentPage}
              onInput={changeIpt}
            />

            <p>/</p>
            <p>{record.total_page}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
