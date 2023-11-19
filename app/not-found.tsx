"use client";

import Button from "@/components/Button";

export default function NotFoundPage() {
  return (
    <main className="p-2 h-screen flex items-center justify-center">
      <div className="border rounded-md text-sm px-4 py-2 flex flex-col gap-4 justify-center">
        <p>Not Found</p>

        <Button
          className="bg-black px-2 py-1 text-white rounded"
          title="Back"
        />
      </div>
    </main>
  );
}
