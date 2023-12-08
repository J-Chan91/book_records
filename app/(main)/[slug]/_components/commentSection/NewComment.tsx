"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { postComment } from "@/api/book";

type FormType = {
  comment: string;
};

type Prop = {
  id: string;
};

export default function NewComment({ id }: Prop) {
  const methods = useForm<FormType>();
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const submit = async (form: FormType) => {
    const res = await postComment(id, { ...form, record_id: parseInt(id) });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex w-full gap-2 text-sm"
        onSubmit={handleSubmit(submit)}
      >
        <Input required name="comment" type="text" className="text-left" />

        <Button
          type="submit"
          variant="primary"
          title="등록"
          disabled={!isValid}
          className="whitespace-nowrap transition"
        />
      </form>
    </FormProvider>
  );
}
