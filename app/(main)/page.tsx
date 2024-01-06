import { getRecords } from "@/api/book";
import RecordsSection from "./_components/recordsSection";

export default async function Home() {
  const records = await getRecords();

  return (
    <main className="bg-white">
      <RecordsSection list={records} />
    </main>
  );
}
