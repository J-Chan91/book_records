import { getRecord } from "@/api/book";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import SummarySection from "./_components/summarySection";

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
        <div className="bg-white py-10 w-full h-screen flex justify-center">
          <div className="flex xl:flex-row flex-col p-0 w-full px-2 gap-2">
            <div className="w-full border rounded border-gray-200">
              <SummarySection record={record} />
            </div>

            <div className="border w-full rounded border-gray-200">{slug}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
