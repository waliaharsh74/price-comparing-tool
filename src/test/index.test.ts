import { scrapePrices } from "../scrapper";
import { getJson } from "serpapi";

// Mock the serpapi module
jest.mock("serpapi", () => ({
    getJson: jest.fn()
}));

describe("scrapePrices", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns mapped shopping results", async () => {
        (getJson as jest.Mock).mockImplementation((_opts: any, cb: any) =>
            cb({
                shopping_results: [
                    {
                        title: "Mock Phone",
                        extracted_price: 999,
                        currency: "USD",
                        link: "https://example.com"
                    }
                ]
            })
        );

        const items = await scrapePrices(
            "mock phone",
            "United States",
            1,
            "FAKE_KEY"
        );

        expect(items).toEqual([
            {
                productName: "Mock Phone",
                price: 999,
                currency: "USD",
                link: "https://example.com"
            }
        ]);
    });

    it("throws an error if API returns an error", async () => {
        (getJson as jest.Mock).mockImplementation((_opts: any, cb: any) =>
            cb({ error: "API limit exceeded" })
        );

        await expect(
            scrapePrices("test", "US", 1, "FAKE_KEY")
        ).rejects.toThrow("Failed to scrape prices: API limit exceeded");
    });

    it("throws an error if required params are missing", async () => {
        await expect(
            scrapePrices("", "", 1, "")
        ).rejects.toThrow("Missing required parameters: query, country, or api_key.");
    });
});
