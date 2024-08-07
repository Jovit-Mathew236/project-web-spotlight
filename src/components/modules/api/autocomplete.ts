import fetch from "node-fetch";

export default async function handler(req: any, res: any) {
  const { q } = req.query;

  try {
    const response = await fetch(
      `https://www.google.com/complete/search?q=${encodeURIComponent(
        q
      )}&client=firefox`
    );
    const data = await response.json();
    res.status(200).json(data[1]);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
