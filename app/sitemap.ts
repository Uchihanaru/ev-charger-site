import { getStations } from '@/lib/companies';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 👇👇👇 IMPORTANT: PASTE YOUR VERCEL LINK INSIDE THESE QUOTES 👇👇👇
  const BASE_URL = 'https://ev-charger-site.vercel.app'; 
  // 👆👆👆 Example: 'https://ev-charger-site.vercel.app'

  // 1. Get all the station data
  const stations = await getStations();

  // 2. Create the entry for the Homepage
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 3. Create an entry for every single Station page (The Infinite Traffic)
  const stationRoutes = stations.map((station) => ({
    url: `${BASE_URL}/company/${station.ID}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Combine them and send to Google
  return [...routes, ...stationRoutes];
}