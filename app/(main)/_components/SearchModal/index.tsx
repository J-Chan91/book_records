"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSearchBooks } from "../../../../api/book";
import Button from "@/components/Button";
import { BookType } from "@/types/bookType";
import Modal from "@/components/Modal";
import RegisterBookModal from "../registerBookModal";
import ImageSection from "./ImageSection";

type FormType = {
  keyword: string;
};

type Props = {
  onUpdateRecords: () => void;
};

export default function SearchModal({ onUpdateRecords }: Props) {
  const { register, handleSubmit } = useForm<FormType>();

  const [books, setBooks] = useState<undefined | BookType[]>(undefined);
  const [hoverItem, setHoverItem] = useState<null | string>(null);
  const [selectItem, setSelectItem] = useState<null | BookType>(null);

  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
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
    setIsOpenSearchModal(false);
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

      <Button
        title="책 등록"
        variant="primary"
        onClick={() => setIsOpenSearchModal(true)}
      />

      {isOpenSearchModal && (
        <Modal
          className="p-2 w-full h-full flex sm:w-[70%] flex-col gap-2 overflow-auto sm:max-w-[70%] sm:max-h-[90%] shadow-md bg-white"
          title="검색"
          onClose={() => setIsOpenSearchModal(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className="w-full mr-2 outline-none text-sm rounded transition border border-gray-200 px-2 py-2 focus:border-gray-400"
                {...register("keyword")}
              />

              <Button type="submit" variant="primary" title="검색" />
            </div>
          </form>

          {books === undefined && <div>undefilend</div>}

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
                    className="hover:border-gray-400 transition border border-gray-200 p-2 rounded flex items-center h-[300px]"
                  >
                    <ImageSection
                      title={item.title}
                      image={item.image}
                      link={item.link}
                    />

                    <div
                      className="relative w-full border cursor-default border-gray-200 rounded h-[250px] ml-2 p-2"
                      onMouseEnter={() => {
                        setHoverItem(item.isbn);
                      }}
                      onMouseLeave={() => {
                        setHoverItem(null);
                      }}
                    >
                      {hoverItem === item.isbn && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.7)]">
                          <Button
                            title="선택"
                            variant="primary"
                            onClick={() => {
                              setIsOpenRegisterModal(true);
                              setSelectItem(item);
                            }}
                          />
                        </div>
                      )}

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
      )}
    </>
  );
}
