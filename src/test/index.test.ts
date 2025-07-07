
import request from "supertest";
import express from "express";
import { router } from "../routes";
import * as scrMod from "../scrapper";

const mockScrape = jest.spyOn(scrMod, "scrapePrices");

const app = express();
app.use(express.json());
app.use("/", router);

afterEach(() => mockScrape.mockReset());

describe("POST /scrape", () => {
    it("returns 200 + results JSON", async () => {
        mockScrape.mockResolvedValueOnce([
            {
                productName: "Mock Bean",
                price: 7.99,
                currency: "USD",
                product_link: "https://example.com/bean"
            }
        ]);

        const res = await request(app)
            .post("/scrape")
            .send({ query: "coffee bean", country: "United States" })
            .expect(200);

        expect(res.body.results).toHaveLength(1);
        expect(mockScrape).toHaveBeenCalledWith(
            "coffee bean",
            "United States",
            1,
            process.env.SERP_API_KEY
        );
    });

    it("400 when query missing", async () => {
        await request(app).post("/scrape").send({}).expect(400);
        expect(mockScrape).not.toHaveBeenCalled();
    });

    it("500 when scraper throws", async () => {
        mockScrape.mockRejectedValueOnce(new Error("boom"));

        const res = await request(app)
            .post("/scrape")
            .send({ query: "fail", country: "US" })
            .expect(500);

        expect(res.body.error).toMatch(/boom/);
    });
});
