"use client";

import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
  isEmptyRecords: boolean;
  onUpdateRecords: () => void;
};

export default function Container({
  children,
  isEmptyRecords,
  onUpdateRecords,
}: Props) {
  return (
    <div className="p-4">
      <Header
        isEmptyRecords={isEmptyRecords}
        onUpdateRecords={onUpdateRecords}
      />

      {children}
    </div>
  );
}
