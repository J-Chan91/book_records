import { useState } from "react";
import Button from "./Button";
import SearchModal from "@/app/(main)/_components/searchModal";

type Props = {
  isEmptyRecords: boolean;
  onUpdateRecords: () => void;
};

export default function Header({ isEmptyRecords, onUpdateRecords }: Props) {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

  return (
    <>
      {isOpenSearchModal && (
        <SearchModal
          open={isOpenSearchModal}
          onClose={() => setIsOpenSearchModal(false)}
          onUpdateRecords={onUpdateRecords}
        />
      )}

      {!isEmptyRecords && (
        <div className="w-full mb-4">
          <Button
            title="책 등록"
            variant="primary"
            className="text-sm"
            onClick={() => setIsOpenSearchModal(true)}
          />
        </div>
      )}
    </>
  );
}
