import { FormEvent } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { BookType } from "@/types/bookType";
import Button from "@/components/Button";
import { postRecord } from "@/api/book";

const ONLY_NUBMER_REGEX = /^[0-9]+$/;

type FormType = {
  total_page: number;
  current_page: number;
};

type Props = {
  onClose: () => void;
  book: null | BookType;
};

export default function RegisterBookModal({ book, onClose }: Props) {
  const methods = useForm<FormType>();
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = async (form: FormType) => {
    if (!book) {
      return false;
    }

    const result = await postRecord({ ...form, ...book });

    console.log(result);
  };

  const changeIpt = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    const isNumber = ONLY_NUBMER_REGEX.test(value);

    if (!isNumber) {
      const onlyNums = value.replace(/[^0-9]/g, "");

      target.value = onlyNums;
    }
  };

  return (
    <Modal
      className="p-2 z-10 w-full h-[50%] flex sm:w-[70%] flex-col gap-2 overflow-auto sm:max-w-[50%] sm:max-h-[90%] shadow-md bg-white"
      title="등록"
      onClose={onClose}
    >
      {book && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="px-2">
            <div className="my-4 w-full">
              <p className="my-4">{book?.title}</p>

              <div className="flex justify-end w-full">
                <Button
                  variant="secondary"
                  title="등록"
                  type="submit"
                  disabled={!isValid}
                />
              </div>
            </div>

            <div className="lg:flex w-full">
              <div className="w-full flex justify-center mb-4">
                <Image
                  src={book?.image}
                  alt={book?.title}
                  width={220}
                  height={320}
                  style={{ width: 220, height: 320 }}
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>페이지</td>

                      <td>
                        <Input
                          name="total_page"
                          type="text"
                          required
                          onInput={changeIpt}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>읽은 페이지</td>
                      <td>
                        <Input
                          name="current_page"
                          type="number"
                          required
                          onInput={changeIpt}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}
