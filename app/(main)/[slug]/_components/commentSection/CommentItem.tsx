import { patchComment } from "@/api/book";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { CommentType } from "@/types/bookType";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormType = {
  comment: string;
};

type Props = {
  item: CommentType;
};

export default function CommentItem({ item }: Props) {
  const methods = useForm<FormType>();
  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;

  const [isModify, setIsModify] = useState(false);

  const submit = async (form: FormType) => {
    const res = await patchComment(item.id.toString(), { ...item, ...form });

    if (res) {
      setIsModify(false);
    }
  };

  useEffect(() => {
    setValue("comment", item.comment);
  }, [item]);

  return (
    <>
      {!isModify ? (
        <div className="flex gap-2 items-center w-full">
          <div className="w-full text-left outline-none text-sm rounded transition border border-gray-200 px-2 py-2 read-only:text-gray-700 focus:border-gray-400">
            <p>{item.comment}</p>
          </div>

          <Button
            title="수정"
            variant="primary"
            className="whitespace-nowrap"
            type="button"
            onClick={() => setIsModify(true)}
          />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex gap-2 items-center w-full"
          >
            <Input
              name="comment"
              required
              className="text-left"
              readOnly={!isModify}
            />

            <Button
              title="저장"
              variant="edit"
              className="whitespace-nowrap"
              type="submit"
            />

            <Button
              title="취소"
              variant="secondary"
              className="whitespace-nowrap"
              type="button"
              onClick={() => setIsModify(false)}
            />
          </form>
        </FormProvider>
      )}
    </>
  );
}
