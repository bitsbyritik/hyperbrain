import { unfurl } from "unfurl.js";

async function fetchWithUnfurl(url: string) {
  try {
    const result = await unfurl(url);

    if (result && Object.keys(result).length > 0) {
      return result;
    }
  } catch (error) {
    console.log("Failed with unfurl", error);
  }

  return null;
}

export async function fetchMetadata(url: string) {
  return (await fetchWithUnfurl(url)) || { error: "Failed to fetch Metadata" };
}
