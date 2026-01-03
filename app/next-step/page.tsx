import { getStations } from '@/lib/companies';
import { redirect } from 'next/navigation';

// 🔒 YOUR SECRET PASSWORD (Change this to anything you want)
const SECRET_KEY = "my-super-secret-password-"; 

// Helper: Scramble the number (Encrypt)
function encryptStep(step: number) {
  // We combine the secret key + the step number, then turn it into Base64 code
  return btoa(SECRET_KEY + step);
}

// Helper: Unscramble the code (Decrypt)
function decryptStep(token: string) {
  try {
    // Turn Base64 back into text
    const decoded = atob(token);
    // Check if it starts with our secret password
    if (decoded.startsWith(SECRET_KEY)) {
      // Extract the number at the end
      return Number(decoded.replace(SECRET_KEY, ''));
    }
  } catch (e) {
    return 0; // Invalid token
  }
  return 0;
}

export default async function NextStep({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  
  const TOTAL_STEPS = 7; 
  const FINAL_LINK = "https://t.me/PaidFile_free_bot?start=BQADAQAD4BYAArrFyEa9q8cIinjoXBYE"; 

  // 1. Decrypt the token to find out which step they are really on
  // If no token, they are at Step 0
  const currentStep = token ? decryptStep(token) : 0;

  // 2. Security Check: If token is invalid (user tried to hack it), restart them
  if (token && currentStep === 0) {
    redirect(`/next-step`); // Restart
  }

  // 3. Check if they are done
  if (currentStep >= TOTAL_STEPS) {
    redirect(FINAL_LINK);
  }

  // 4. Calculate the NEXT step
  const nextStep = currentStep + 1;
  const nextToken = encryptStep(nextStep); // Scramble it again

  // 5. Pick a RANDOM station
  const stations = await getStations();
  const randomIndex = Math.floor(Math.random() * stations.length);
  const randomStation = stations[randomIndex];

  // 6. Redirect with the SCRAMBLED token
  // We also pass "display" just for the text "Step X of 7", but changing this won't hack the system
  redirect(`/company/${randomStation.ID}?token=${nextToken}&display=${nextStep}`);
}