import fetch from "node-fetch";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function handler(req, res) {
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
