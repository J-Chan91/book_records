"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="p-2 h-screen flex items-center justify-center">
      <div className="border rounded-md text-sm p-4 flex flex-col gap-4 justify-center">
        <p className="text-center">Not Found</p>

        <Button
          variant="primary"
          title="메인으로 이동"
          onClick={() => router.push("/")}
        />
      </div>
    </main>
  );
}
