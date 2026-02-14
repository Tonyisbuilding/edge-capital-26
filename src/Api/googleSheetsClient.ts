const FALLBACK_APP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxEY8PyIZSk9irTrQBS-0TC1EM7YrUij4hCL-DM45_CY-rh2khXhXVyab-i8PwRwZJi/exec";

const APP_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? FALLBACK_APP_SCRIPT_URL;

type SubmitPayload = Record<string, unknown>;

interface SubmitOptions<TPayload extends object> {
  formSlug: string;
  payload: TPayload;
}

interface SheetResponse {
  ok: boolean;
  message?: string;
  [key: string]: unknown;
}

async function submitToGoogleSheet<TPayload extends object>({
  formSlug,
  payload,
}: SubmitOptions<TPayload>): Promise<SheetResponse> {
  if (!APP_SCRIPT_URL) {
    throw new Error(
      "Missing VITE_GOOGLE_SCRIPT_URL. Add it to your environment to enable submissions."
    );
  }

  if (!import.meta.env.VITE_GOOGLE_SCRIPT_URL && FALLBACK_APP_SCRIPT_URL) {
    console.warn(
      "VITE_GOOGLE_SCRIPT_URL not set. Falling back to the default Google Apps Script endpoint."
    );
  }

  const response = await fetch(APP_SCRIPT_URL, {
    method: "POST",
    headers: {
      // Avoid CORS preflight (Apps Script doesn't allow OPTIONS here)
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      formSlug,
      ...(payload as SubmitPayload),
    }),
  });

  // Try to parse JSON; if not, show raw text to aid debugging
  const raw = await response.text();
  let data: SheetResponse;
  try {
    data = JSON.parse(raw) as SheetResponse;
  } catch {
    throw new Error(
      `Kon het antwoord van Google Sheets niet lezen. Server zei: ${raw?.slice(0, 300) || "(leeg)"}`
    );
  }

  if (!response.ok || !data.ok) {
    const message =
      data?.message ||
      `Google Sheets koppeling gaf een fout (${response.status}). Probeer het later opnieuw.`;
    throw new Error(message);
  }

  return data;
}

export { submitToGoogleSheet };
export type { SheetResponse };

// ────────────────────────────────────────────────────────────────────────────────
// Fund Returns CMS API
// ────────────────────────────────────────────────────────────────────────────────

const FALLBACK_FUND_RETURNS_URL =
  "https://script.google.com/macros/s/AKfycbzl1PE1ZsrGpXeitOMqEqysD2STNw11KwGYFl7VAUCQP6J0zRCl3uJZGCx9AcZqBh2GrQ/exec";

const FUND_RETURNS_SCRIPT_URL =
  import.meta.env.VITE_FUND_RETURNS_SCRIPT_URL ?? FALLBACK_FUND_RETURNS_URL;

interface FundMonth {
  nl: string;
  en: string;
  key: string;
}

interface FundReturns {
  monthly: number;
  ytd: number;
  since_inception: number;
  cagr: number;
}

interface FundClassData {
  month: FundMonth;
  returns: FundReturns;
}

interface FundReturnsResponse {
  EC_Class_I: FundClassData | null;
  EC_Class_II: FundClassData | null;
  EC_Class_III: FundClassData | null;
  EN_Class_I: FundClassData | null;
  EN_Class_II: FundClassData | null;
  EN_Class_III: FundClassData | null;
}

/**
 * Fetches the latest published fund returns from the Google Sheets CMS
 */
async function fetchFundReturns(): Promise<FundReturnsResponse | null> {
  if (!FUND_RETURNS_SCRIPT_URL) {
    console.warn(
      "VITE_FUND_RETURNS_SCRIPT_URL not set. Fund returns will use fallback data."
    );
    return null;
  }

  try {
    const response = await fetch(FUND_RETURNS_SCRIPT_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data as FundReturnsResponse;
  } catch (error) {
    console.error("Failed to fetch fund returns:", error);
    return null;
  }
}

export { fetchFundReturns };
export type { FundReturnsResponse, FundClassData, FundMonth, FundReturns };

// ────────────────────────────────────────────────────────────────────────────────
// Video CMS API
// ────────────────────────────────────────────────────────────────────────────────

interface VideoData {
  youtube_url: string;
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  thumbnail_url: string;
  sort_order: number;
}

/**
 * Extracts YouTube video ID from various URL formats
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Returns an array of YouTube thumbnail URLs in descending quality order.
 * maxresdefault (1080p) → sddefault (640p) → hqdefault (480p)
 */
function getYouTubeThumbnails(url: string): string[] {
  const id = extractYouTubeId(url);
  if (!id) return [];
  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  ];
}

/**
 * Returns the highest quality YouTube thumbnail URL (first in chain).
 */
function getYouTubeThumbnail(url: string): string {
  const thumbs = getYouTubeThumbnails(url);
  return thumbs[0] || '';
}

/**
 * Fetches video data from the CMS (same endpoint as fund returns)
 */
async function fetchVideos(): Promise<VideoData[] | null> {
  if (!FUND_RETURNS_SCRIPT_URL) {
    return null;
  }

  try {
    const response = await fetch(FUND_RETURNS_SCRIPT_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    return data.videos ?? null;
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return null;
  }
}

export { fetchVideos, getYouTubeThumbnail, getYouTubeThumbnails };
export type { VideoData };
