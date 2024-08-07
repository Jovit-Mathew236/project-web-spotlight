import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());

app.get("/search-suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`https://www.google.com/complete/search`, {
      params: {
        q,
        client: "firefox",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching suggestions");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
