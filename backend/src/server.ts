import express from "express";
import cors from "cors";
import { positions } from "./data/portfolio";
import { computeSummary } from "./services/portfolioSummary";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// GET /api/portfolio - Returns full list of positions
app.get("/api/portfolio", (req, res) => {
  res.json(positions);
});

// GET /api/portfolio/summary - Returns portfolio summary
// Accepts optional ?status=available|retired query param to filter positions
//
// IMPORTANT: The 2-second delay below is intentional and MUST NOT be removed.
// This simulates a slow API response. Your task is to handle this gracefully
// in the frontend - do not remove or reduce this delay.
app.get("/api/portfolio/summary", async (req, res) => {
  const { status } = req.query;

  if (status !== undefined && status !== "available" && status !== "retired") {
    res.status(400).json({ error: `Invalid status "${status}". Must be "available" or "retired".` });
    return;
  }

  // Intentional 2-second delay - DO NOT REMOVE OR MODIFY
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const filtered = status ? positions.filter((p) => p.status === status) : positions;
  const summary = computeSummary(filtered);
  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
