import { getJson } from "serpapi";

export interface PriceItem {
    productName: string;
    price: number | null;
    currency: string | null;
    product_link: string;
}

export async function scrapePrices(
    query: string,
    country: string,
    pages: number = 1,
    api_key: string
) {
    if (!query || !country || !api_key) {
        throw new Error("Missing required parameters: query, country, or api_key.");
    }

    try {
        const response = await getJson({

            engine: "google_shopping",
            api_key,
            q: query,
            location: country,
            num: pages * 100,
            sort_by: "price_ascending"
        });

        console.log(response);


        const results: PriceItem[] = (response.shopping_results ?? []).map((p: any) => ({
            productName: p.title ?? "Unknown Product",
            price: p.extracted_price ?? null,
            currency: p.currency ?? null,
            product_link: p.product_link ?? "#"
        }));

        return results;
    } catch (error: any) {
        console.error("Error in scrapePrices:", error);
        throw new Error(`Failed to scrape prices: ${error.message || error}`);
    }
}
