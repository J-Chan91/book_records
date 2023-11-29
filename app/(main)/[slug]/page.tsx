import { getRecord } from "@/api/book";
import { notFound } from "next/navigation";
import { Fragment } from "react";

type Props = {
  params: { slug: string };
};

export default async function Page({ params: { slug } }: Props) {
  const record = await getRecord(slug);

  return (
    <Fragment>
      {!record ? (
        notFound()
      ) : (
        <div className="bg-white w-full h-screen flex justify-center">
          <div className="w-1/2 lg:flex gap-2">
            <div className="w-full border rounded border-gray-200">{slug}</div>

            <div className="border w-full rounded border-gray-200">{slug}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
