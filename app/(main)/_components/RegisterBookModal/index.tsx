import Modal from "@/components/Modal";
import { BookType } from "@/types/bookType";

type Props = {
  onClose: () => void;
  book: null | BookType;
};

export default function RegisterBookModal({ book, onClose }: Props) {
  return (
    <Modal
      className="p-2 z-10 w-full h-full flex sm:w-[70%] flex-col gap-2 overflow-auto sm:max-w-[70%] sm:max-h-[90%] shadow-md bg-white"
      title="등록"
      onClose={onClose}
    >
      <div>{book?.title}</div>
    </Modal>
  );
}
