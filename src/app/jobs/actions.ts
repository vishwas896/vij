"use server";

import { z } from "zod";

const SearchJobsSchema = z.object({
  what: z.string().optional(),
  where: z.string().optional(),
});

export async function searchJobs(input: z.infer<typeof SearchJobsSchema>) {
    const validation = SearchJobsSchema.safeParse(input);

    if (!validation.success) {
        return { success: false, error: "Invalid search query.", jobs: [] };
    }

    const { what, where } = validation.data;
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
        console.error("Adzuna API credentials are not set in .env file.");
        return { success: false, error: "Server configuration error.", jobs: [] };
    }

    const searchParams = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        results_per_page: '12',
        what: what || 'social impact', // Default search to social impact
        where: where || 'india', // Default location to India
        content_type: 'application/json'
    });

    try {
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/in/search/1?${searchParams.toString()}`);

        if (!response.ok) {
            console.error('Adzuna API error:', response.status, await response.text());
            return { success: false, error: 'Failed to fetch jobs from the provider.', jobs: [] };
        }

        const data = await response.json();
        return { success: true, jobs: data.results || [] };
    } catch (error) {
        console.error("Error fetching jobs from Adzuna:", error);
        return { success: false, error: "An unexpected error occurred while fetching jobs.", jobs: [] };
    }
}
