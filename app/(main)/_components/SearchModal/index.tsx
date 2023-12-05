"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSearchBooks } from "../../../../api/book";
import Button from "@/components/Button";
import { BookType, RecordType } from "@/types/bookType";
import Modal from "@/components/Modal";
import RegisterBookModal from "../registerBookModal";
import ImageSection from "./ImageSection";

type FormType = {
  keyword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onUpdateRecords: () => void;
};

export default function SearchModal({ open, onClose, onUpdateRecords }: Props) {
  const { register, handleSubmit } = useForm<FormType>();

  const [books, setBooks] = useState<undefined | BookType[]>(undefined);
  const [selectItem, setSelectItem] = useState<null | BookType>(null);

  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const onSubmit = async ({ keyword }: FormType) => {
    const res = await getSearchBooks(keyword);

    if (res) {
      setBooks(res.items);
    } else {
      setBooks([]);
    }
  };

  const addRecord = () => {
    onUpdateRecords();
    setIsOpenRegisterModal(false);
    onClose();
  };

  const clickItem = (item: BookType) => {
    setIsOpenRegisterModal(true);
    setSelectItem(item);
  };

  return (
    <>
      {isOpenRegisterModal && (
        <RegisterBookModal
          book={selectItem}
          onClose={() => setIsOpenRegisterModal(false)}
          onAddRecord={addRecord}
        />
      )}

      <Modal
        className="p-2 w-full h-full flex sm:w-[70%] flex-col gap-2 overflow-auto sm:max-w-[70%] sm:max-h-[90%] shadow-md bg-white"
        title="책 검색"
        onClose={onClose}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-2"
        >
          <input
            className="w-full outline-none text-sm rounded transition border border-gray-200 px-2 py-2 focus:border-gray-400"
            {...register("keyword")}
          />

          <Button
            type="submit"
            variant="primary"
            title="검색"
            className="whitespace-nowrap md:w-[10%] w-full h-full"
          />
        </form>

        {books === undefined && <div />}

        {books && !books.length ? (
          <div>
            <p>검색결과가 없어요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 overflow-auto">
            {books &&
              books.map((item) => (
                <div
                  key={item.isbn}
                  className="hover:border-gray-400 transition border border-gray-200 p-2 rounded flex items-center h-[400px]"
                >
                  <ImageSection
                    title={item.title}
                    image={item.image}
                    link={item.link}
                    item={item}
                    onClickItem={clickItem}
                  />

                  <div className="overflow-auto relative w-full border cursor-default border-gray-200 rounded h-[250px] ml-2 p-2">
                    <div className="h-full w-full py-1">
                      <p>
                        {item.title} - {item.author}
                      </p>

                      <hr className="my-2 " />

                      <div className="text-xs text-gray-900 whitespace-pre-wrap overflow-hidden">
                        {item.description.slice(0, 400)}...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Modal>
    </>
  );
}
