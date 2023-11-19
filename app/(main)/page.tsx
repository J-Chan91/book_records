import SearchModal from "./_components/SearchModal";
import ProgressBar from "@/components/ProgressBar";
import { getRecords } from "@/api/book";

export default async function Home() {
  const records = await getRecords();

  return (
    <main className="bg-white w-full h-screen p-4">
      <SearchModal />

      <div className="w-full">
        <ProgressBar percent={30} />
      </div>

      <div className="border my-4 w-full h-[90%] overflow-auto p-2">
        <div className="h-[1500px] bg-red-50" />
      </div>
    </main>
  );
}
