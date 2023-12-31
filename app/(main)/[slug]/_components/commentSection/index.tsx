"use client";

import { useEffect, useState } from "react";
import { CommentType } from "@/types/bookType";
import AddComment from "./AddComment";
import Comments from "./Comments";

type Props = {
  id: string;
  comments: undefined | CommentType[];
};

export default function CommentSection({ id, comments }: Props) {
  const [list, setList] = useState<undefined | CommentType[]>(undefined);

  useEffect(() => {
    setList(comments);
  }, [comments]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full flex-col gap-2 h-full p-2">
        <AddComment id={id} />

        <Comments list={list} />
      </div>
    </div>
  );
}
