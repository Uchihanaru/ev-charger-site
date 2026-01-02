import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export type Station = {
  'Station Name': string;
  'Street Address': string;
  City: string;
  State: string;
  ZIP: string;
  'EV Network': string;
  ID: string;
};

export async function getStations(): Promise<Station[]> {
  const filePath = path.join(process.cwd(), 'data', 'stations.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  // LIMITER: We slice to 1000 pages for now so your laptop doesn't freeze.
  // To get ALL 50,000 pages, remove ".slice(0, 1000)" later.
  return (data as any[]).slice(0, 1000).map((station, index) => ({
    'Station Name': station['Station Name'],
    'Street Address': station['Street Address'],
    City: station.City,
    State: station.State,
    ZIP: station.ZIP,
    'EV Network': station['EV Network'],
    // Create a safe URL ID
    ID: `${index}-${station.City?.toLowerCase().replace(/[^a-z]/g, '')}`
  }));
}

export async function getStationById(id: string): Promise<Station | undefined> {
  const stations = await getStations();
  return stations.find((s) => s.ID === id);
}