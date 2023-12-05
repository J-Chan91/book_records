"use client";

import Input from "@/components/Input";
import NewComment from "./NewComment";
import { CommentType, CommentsType } from "@/types/bookType";
import { useEffect, useState } from "react";
import Comments from "./Comments";

type Props = {
  id: string;
  comments: undefined | CommentsType;
};

export default function CommentSection({ id, comments }: Props) {
  const [list, setList] = useState<undefined | CommentsType>(undefined);

  useEffect(() => {
    setList(comments);
  }, [comments]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full flex-col gap-2 h-full p-2">
        <NewComment id={id} />

        <Comments list={list} />
      </div>
    </div>
  );
}
