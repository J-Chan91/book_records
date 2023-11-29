import SearchModal from "./_components/searchModal";
import ProgressBar from "@/components/ProgressBar";
import { getRecords } from "@/api/book";
import RecordsSection from "./_components/recordsSection";

export default async function Home() {
  const records = await getRecords();

  return (
    <main className="bg-white h-screen p-4">
      <SearchModal />

      <div className="my-4 flex justify-center overflow-auto">
        <RecordsSection list={records} />
      </div>
    </main>
  );
}
