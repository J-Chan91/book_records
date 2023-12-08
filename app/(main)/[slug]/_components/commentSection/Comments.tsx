import { CommentType } from "@/types/bookType";
import CommentItem from "./CommentItem";
import { Fragment } from "react";

type Props = {
  list: undefined | CommentType[];
};
export default function Comments({ list }: Props) {
  return (
    <div className="h-full">
      {!list?.length ? (
        <p className="w-full flex text-sm items-center justify-center bg-white h-[100%]">
          저장한 글이 없어요
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {list.map((item) => (
            <Fragment key={item.id}>
              <CommentItem item={item} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
