import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComments, getRecord } from "@/api/book";
import SummarySection from "./_components/summarySection";
import CommentSection from "./_components/commentSection";

type Props = {
  params: { slug: string };
};

export default async function Page({ params: { slug } }: Props) {
  const record = await getRecord(slug);
  const comments = await getComments(slug);

  return (
    <Fragment>
      {!record ? (
        notFound()
      ) : (
        <div className="bg-white py-10 w-full h-screen px-2 justify-center">
          <div className="mb-2">
            <Link
              href="/"
              className="bg-blue-500 px-4 py-1 rounded text-white disabled:bg-gray-200 hover:bg-blue-600 active:bg-blue-700 text-sm"
            >
              홈
            </Link>
          </div>

          <div className="flex xl:flex-row flex-col p-0 w-full h-full gap-2">
            <div className="w-full border rounded border-gray-200">
              <SummarySection record={record} />
            </div>

            <div className="border w-full h-full rounded border-gray-200">
              <CommentSection comments={comments} id={slug} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
