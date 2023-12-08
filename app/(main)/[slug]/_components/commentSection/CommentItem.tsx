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

  const submit = (form: FormType) => {
    if (isModify) {
      console.log("form", form);
    }
  };

  useEffect(() => {
    setValue("comment", item.comment);
  }, [item]);

  return (
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

        {!isModify ? (
          <Button
            title="수정"
            variant="primary"
            className="whitespace-nowrap"
            type="button"
            onClick={() => setIsModify(true)}
          />
        ) : (
          <Button
            title="저장"
            variant="primary"
            className="whitespace-nowrap"
            type="submit"
          />
        )}
      </form>
    </FormProvider>
  );
}
