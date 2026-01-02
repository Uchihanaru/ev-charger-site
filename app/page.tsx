import { getStations } from '@/lib/companies';
import StationSearch from '@/components/StationSearch'; // Importing the search engine

export default async function Home() {
  // 1. Fetch the data on the server (Fast!)
  const stations = await getStations();

  // 2. Pass the data to the Client Component to handle the search
  return (
    <main>
      <StationSearch stations={stations} />
    </main>
  );
}