import { Router } from "express";
import { scrapePrices } from "./scrapper";
import 'dotenv/config'

export const router = Router();
const api_key = process.env.SERP_API_KEY!

router.post("/scrape", async (req, res) => {
    const { query, country = "United States", pages = 1 } = req.body || {};

    if (!query)  {res.status(400).json({ error: "query required" });
    return
}
    

    try {
        const results = await scrapePrices(
            query,
            country,
            pages,
            api_key
        );
        res.json({ results });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});
