import { CommentType } from "@/types/bookType";

type Props = {
  list: undefined | CommentType[];
};
export default function Comments({ list }: Props) {
  return (
    <div className="h-full">
      {!list ? (
        <p className="w-full flex text-sm items-center justify-center bg-white h-[100%]">
          저장한 글이 없어요
        </p>
      ) : (
        <div>
          <p>hi</p>
        </div>
      )}
    </div>
  );
}
